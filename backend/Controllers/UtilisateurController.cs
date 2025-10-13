using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models.Fac;
using backend.Services;
using backend.DTOs;
using System.Linq;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurController(FacContext facDBContext, IPasswordHasher<Utilisateur> hasher, JwtService jwtService): ControllerBase
    {
        private readonly FacContext _facDBContext = facDBContext;
        private readonly IPasswordHasher<Utilisateur> _hasher = hasher;
        private readonly JwtService _jwtService = jwtService;

        [HttpGet("list-users")]
        public async Task<IActionResult> ListUsers(int id)
        {
            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == id);

            if (authUser is null)
            {
                return BadRequest(new { error = "Votre utilisateur authentifié n'est pas inscrit sur le serveur." });
            }

            int? idRole = authUser?.RoleUtilisateurs.FirstOrDefault()?.IdRole;
            if (idRole != 1)
            {
                return StatusCode(401, new { error = "Vous n'êtes pas autorisé à accéder à cette ressource;" });

            }

            List<UserForListing> users = await (from us in _facDBContext.Utilisateurs
                                                join ru in _facDBContext.RoleUtilisateurs on us.IdUtilisateur equals ru.IdUtilisateur
                                                join ro in _facDBContext.Roles on ru.IdRole equals ro.IdRole
                                                group new { ru, ro } by new { us.IdUtilisateur, us.Identifiant } into g
                                                select new UserForListing
                                                {
                                                    IdUtilisateur = g.Key.IdUtilisateur,
                                                    Identifiant = g.Key.Identifiant,
                                                    Role = g.Select(x => x.ro.NomRole).FirstOrDefault()??"undefined"
                                                }).ToListAsync();



            return Ok(users);
        }
        
        [HttpPost("insert-user")]
        public async Task<IActionResult> InsertUser([FromBody] InsertUserRequest request){
            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == request.IdUser);

            if (authUser is null)
            {
                return BadRequest(new { error = "Votre utilisateur authentifié n'est pas inscrit sur le serveur." });
            }

            int? idRole = authUser?.RoleUtilisateurs.FirstOrDefault()?.IdRole;
            if (idRole != 1)
            {
                return StatusCode(401, new { error = "Vous n'êtes pas autorisé à accéder à cette ressource;" });

            }

            Utilisateur existingUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.Identifiant == request.NewUserIdentifiant);

            if (existingUser is not null)
            {
                return BadRequest(new { message = "L'identifiant d'utilisateur souhaité est déjà utilisé" });
            }
            
            Utilisateur newUser = new Utilisateur
            {
                Identifiant = request.NewUserIdentifiant
            };
            newUser.MotDePasse = _hasher.HashPassword(newUser, request.NewUserMotDePasse);
            newUser.RoleUtilisateurs.Add(new RoleUtilisateur{IdRole = request.IdNewUserRole });
            _facDBContext.Utilisateurs.Add(newUser);
            await _facDBContext.SaveChangesAsync();

            return Ok(new { status = true });
        }
    }
}
