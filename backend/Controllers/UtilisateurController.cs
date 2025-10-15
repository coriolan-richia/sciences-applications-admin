using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models.Fac;
using backend.Services;
using backend.DTOs.Utilisateur;
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

        [HttpPost("get-one-user")]
        public async Task<IActionResult> GetOneUser([FromBody] GetOneUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("L'identifiant fourni est invalide");
            }
            
            Utilisateur? authUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == request.AuthId);
            if (authUser is null)
            {
                return BadRequest("L'utilisateur authentifié est inconnu");
            }

            RoleUtilisateur? authRoleUser = _facDBContext.RoleUtilisateurs.FirstOrDefault(ru => ru.IdUtilisateur == request.AuthId);
            if (authRoleUser is null)
            {
                return StatusCode(401,"Vous n'avez aucun droit");
            }
            if (authRoleUser.IdRole!= 1)
            {
                return StatusCode(401,"Vous n'avez pas le droit d'effectuer cette action");
            }

            Utilisateur? targetUser = await _facDBContext.Utilisateurs.Include(u => u.RoleUtilisateurs).FirstOrDefaultAsync(u => u.IdUtilisateur == request.TargetId);
            
            if (targetUser is null)
            {
                return BadRequest("Aucun utilisateur ne correspond à cet identifiant.");
            }
            RoleUtilisateur? targetRoleUser = _facDBContext.RoleUtilisateurs.Where(ru => ru.IdUtilisateur == request.TargetId).FirstOrDefault();
            if (targetRoleUser is null)
            {
                return BadRequest("Cet utilisateur n'est associé à aucun role");
            }
            
            GetOneUserResponse responseUser = new GetOneUserResponse{ IdUser = targetUser.IdUtilisateur, Identifiant = targetUser.Identifiant, IdRole = targetRoleUser.IdRole  };
            

            return Ok(responseUser);
        }

        [HttpPost("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request){
            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == request.AuthId);

            if (authUser is null)
            {
                return BadRequest(new { error = "Votre utilisateur authentifié n'est pas inscrit sur le serveur." });
            }

            int? idRole = authUser?.RoleUtilisateurs.FirstOrDefault()?.IdRole;
            if (idRole is null)
            {
                return StatusCode(401, "Vous n'avez aucune droit");
            }
            if (idRole != 1)
            {
                return StatusCode(401, new { error = "Vous n'êtes pas autorisé à accéder à cette ressource;" });

            }

            Utilisateur? targetUser = _facDBContext.Utilisateurs.Include(u => u.RoleUtilisateurs).FirstOrDefault(u => u.Identifiant == request.TargetIdentifiant);
            if (targetUser is null)
            {
                return BadRequest("Cet utilisateur n'existe pas");
            }
            
            targetUser.Identifiant = request.TargetIdentifiant;
            if (!string.IsNullOrEmpty(request.Password)) targetUser.MotDePasse = _hasher.HashPassword(targetUser, request.Password);

            
            var roleUtilisateurs = targetUser.RoleUtilisateurs.FirstOrDefault();
            if (roleUtilisateurs is null)
            {
                return StatusCode(400, "Cet utilisateur n'a aucun rôle.");
            }
            roleUtilisateurs.IdRole = request.RoleId??2;

            _facDBContext.Utilisateurs.Update(targetUser);
            await _facDBContext.SaveChangesAsync();

            return Ok(new { status = true });
        }

        [HttpPost("delete-user")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("L'identifiant fourni est invalide");
            }
            
            Utilisateur? authUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == request.AuthId);
            if (authUser is null)
            {
                return BadRequest("L'utilisateur authentifié est inconnu");
            }

            RoleUtilisateur? authRoleUser = _facDBContext.RoleUtilisateurs.FirstOrDefault(ru => ru.IdUtilisateur == request.AuthId);
            if (authRoleUser is null)
            {
                return StatusCode(401,"Vous n'avez aucun droit");
            }
            if (authRoleUser.IdRole!= 1)
            {
                return StatusCode(401,"Vous n'avez pas le droit d'effectuer cette action");
            }

            Utilisateur? targetUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == request.TargetId);
            List<RoleUtilisateur> targetRoleUsers = _facDBContext.RoleUtilisateurs.Where(ru => ru.IdUtilisateur == request.TargetId).ToList();
            if (targetUser is null)
            {
                return BadRequest("Aucun utilisateur ne correspond à cet identifiant.");
            }

            _facDBContext.RoleUtilisateurs.RemoveRange(targetRoleUsers);
            _facDBContext.Utilisateurs.Remove(targetUser);
            await _facDBContext.SaveChangesAsync();

            return Ok(new { success = true, message= "Suppression réussie de l'utilisateur."});

        }
        [HttpPost("list-users")]
        public async Task<IActionResult> ListUsers([FromBody] ListUsersRequest request)
        {
            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == request.authId);

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

            Utilisateur? existingUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.Identifiant == request.NewUserIdentifiant);

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
