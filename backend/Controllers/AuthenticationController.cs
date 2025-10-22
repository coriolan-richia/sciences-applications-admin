using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models.Fac;
using backend.DTOs;
using backend.Services;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController(FacContext facDBContext, IPasswordHasher<Utilisateur> hasher, JwtService jwtService) : ControllerBase
    {
        private readonly FacContext _facDBContext = facDBContext;
        private readonly IPasswordHasher<Utilisateur> _hasher = hasher;
        private readonly JwtService _jwtService = jwtService;

        [HttpGet("initialize")]
        public async Task<IActionResult> Initialize()
        {
            bool exist = false;
            var user = _facDBContext.Utilisateurs.Include(u => u.RoleUtilisateurs).ThenInclude(ru => ru.IdRoleNavigation).SingleOrDefault(u => u.Identifiant == "admin");

            // if (already is not null)
            // {
            //     return BadRequest("L'utilisateur 'admin' existe déjà.");
            // }

            var supAdminRole = _facDBContext.Roles.FirstOrDefault(r => r.NomRole == "superadmin");
            if (supAdminRole is null)
            {
                supAdminRole = new Role { NomRole = "superadmin" };
                _facDBContext.Roles.Add(supAdminRole);
            }

            var adminRole = _facDBContext.Roles.FirstOrDefault(r => r.NomRole == "admin");
            if (adminRole is null)
            {
                adminRole = new Role { NomRole = "admin" };
                _facDBContext.Roles.Add(adminRole);
            }

            await _facDBContext.SaveChangesAsync();

            if(user is null)
            {
                user = new Utilisateur();
                user.Identifiant = "admin";
                user.MotDePasse = _hasher.HashPassword(user, "123456");

                user.RoleUtilisateurs = new List<RoleUtilisateur> {
                    new RoleUtilisateur { IdRoleNavigation = supAdminRole }
                };
                _facDBContext.Utilisateurs.Add(user);
            }
            else
            {
                exist = true;

                var roleUtilisateur = user.RoleUtilisateurs.FirstOrDefault();
                if (roleUtilisateur is not null)
                {
                    roleUtilisateur.IdRoleNavigation = supAdminRole;

                }
                else
                {
                    user.RoleUtilisateurs.Add(new RoleUtilisateur
                    {
                        IdRoleNavigation = supAdminRole,
                    });
                }

                _facDBContext.Utilisateurs.Update(user);
            }
            
            await _facDBContext.SaveChangesAsync();

            if (exist) return Ok("Utilisateur mis à jour.");
            return Ok("Utilisateur 'admin' créé avec succès.");
        }

        [HttpPost]
        public async Task<IActionResult> Connexion([FromBody] LoginRequest loginData)
        {
            if (string.IsNullOrWhiteSpace(loginData.Identifiant) || string.IsNullOrWhiteSpace(loginData.MotDePasse))
            {
                return BadRequest(new { message = "Identifiant et mot de passe requis." });
            }

            var user = await _facDBContext.Utilisateurs.Include(u => u.RoleUtilisateurs).ThenInclude(ru => ru.IdRoleNavigation).FirstOrDefaultAsync(u => u.Identifiant == loginData.Identifiant);

            if (user == null)
            {
                return Unauthorized(new { message = "Identifiants incorrects." });
            }

            var result = _hasher.VerifyHashedPassword(user, user.MotDePasse, loginData.MotDePasse);

            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Identifiants incorrects." });
            }

            string token = _jwtService.GenerateToken(user.IdUtilisateur, user.Identifiant);            

            var userResponse = new
            {
                user.IdUtilisateur,
                user.Identifiant,
                user.RoleUtilisateurs.FirstOrDefault()?.IdRoleNavigation?.NomRole,
                token,
            };

            return Ok(userResponse);
        }

    }
}