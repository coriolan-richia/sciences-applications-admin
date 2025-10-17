using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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
            if (request.AuthId is null)
            {
                return NonAuthenticableUser();
            }
            
            if (!ModelState.IsValid)
            {
                return ProblematicModelState(ModelState,"Model Error");
            }
            
            Utilisateur? authUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == request.AuthId);
            if (authUser is null)
            {
                return UnknownUser();
            }

            RoleUtilisateur? authRoleUser = _facDBContext.RoleUtilisateurs.FirstOrDefault(ru => ru.IdUtilisateur == request.AuthId);
            if (authRoleUser is null||authRoleUser.IdRole!=1)
            {
                return CustomForbid();
            }

            Utilisateur? targetUser = await _facDBContext.Utilisateurs.Include(u => u.RoleUtilisateurs).FirstOrDefaultAsync(u => u.IdUtilisateur == request.TargetId);

            if (targetUser is null)
            {
                return NotFound(new
                {
                    status = 404,
                    error = "User Not Found",
                    message = "L'utilisateur ciblé n'existe pas.",
                });
            }
            
            RoleUtilisateur? targetRoleUser = _facDBContext.RoleUtilisateurs.Where(ru => ru.IdUtilisateur == request.TargetId).FirstOrDefault();
            
            GetOneUserResponse responseUser = new GetOneUserResponse{ IdUser = targetUser.IdUtilisateur, Identifiant = targetUser.Identifiant, IdRole = targetRoleUser?.IdRole  };
            

            return Ok(responseUser);
        }

        [HttpPost("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request){
            if (request.AuthId == null)
            {
                return NonAuthenticableUser();
            }

            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == request.AuthId);

            if (authUser is null)
            {
                return UnknownUser();
            }

            int? idRole = authUser?.RoleUtilisateurs.FirstOrDefault()?.IdRole;
            if (idRole!=1)
            {
                return CustomForbid();
            }
            

            Utilisateur? targetUser = _facDBContext.Utilisateurs.Include(u => u.RoleUtilisateurs).FirstOrDefault(u => u.Identifiant == request.TargetIdentifiant);
            if (targetUser is null)
            {
                return UnknownUser();
            }
            
            targetUser.Identifiant = request.TargetIdentifiant;
            if (!string.IsNullOrEmpty(request.Password)) targetUser.MotDePasse = _hasher.HashPassword(targetUser, request.Password);

            
            var roleUtilisateur = targetUser.RoleUtilisateurs.FirstOrDefault();
            if (roleUtilisateur is not null)
            {
                roleUtilisateur.IdRole = request.RoleId;

            }
            else
            {
                targetUser.RoleUtilisateurs.Add(new RoleUtilisateur{
                    IdUtilisateur = targetUser.IdUtilisateur,
                    IdRole = request.RoleId,
                });
            }

            _facDBContext.Utilisateurs.Update(targetUser);
            await _facDBContext.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                error = "Update Successful",
                message = "Utilisateur mis à jour avec succès.",
                data = targetUser
            });

        }

        [HttpPost("delete-user")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest request)
        {
            if (request.AuthId == null)
            {
                return NonAuthenticableUser();
            }

            Utilisateur? authUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == request.AuthId);
            if (authUser is null)
            {
                return UnknownUser();
            }

            RoleUtilisateur? authRoleUser = _facDBContext.RoleUtilisateurs.FirstOrDefault(ru => ru.IdUtilisateur == request.AuthId);
            if (authRoleUser is null||authRoleUser.IdRole != 1)
            {
                return CustomForbid();
            }

            Utilisateur? targetUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == request.TargetId);
            List<RoleUtilisateur> targetRoleUsers = _facDBContext.RoleUtilisateurs.Where(ru => ru.IdUtilisateur == request.TargetId).ToList();
            if (targetUser is null)
            {
                return NotFound(new
                {
                    status = 404,
                    error = "User Not Found",
                    message = "L'utilisateur ciblé n'existe pas.",
                });
            }

            _facDBContext.RoleUtilisateurs.RemoveRange(targetRoleUsers);
            _facDBContext.Utilisateurs.Remove(targetUser);
            await _facDBContext.SaveChangesAsync();

            return NoContent();

        }
        
        [HttpPost("list-users")]
        public async Task<IActionResult> ListUsers([FromBody] ListUsersRequest request)
        {
            if (!ModelState.IsValid)
            {
                return NonAuthenticableUser();
            }

            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == request.authId);
            if (authUser is null)
            {
                return UnknownUser();
            }

            int? idRole = authUser?.RoleUtilisateurs.FirstOrDefault()?.IdRole;
            if (idRole != 1)
            {
                return CustomForbid();

            }

            List<UserForListing> users = await (
                from us in _facDBContext.Utilisateurs
                join ru in _facDBContext.RoleUtilisateurs on us.IdUtilisateur equals ru.IdUtilisateur
                join ro in _facDBContext.Roles on ru.IdRole equals ro.IdRole
                group new { ru, ro } by new { us.IdUtilisateur, us.Identifiant } into g
                select new UserForListing
                {
                    IdUtilisateur = g.Key.IdUtilisateur,
                    Identifiant = g.Key.Identifiant,
                    Role = g.Select(x => x.ro.NomRole).FirstOrDefault() ?? "undefined"
                }).ToListAsync();

            return Ok(users);
        }

        [HttpPost("insert-user")]
        public async Task<IActionResult> InsertUser([FromBody] InsertUserRequest request)
        {
            if (request.IdUser == null)
            {
                return NonAuthenticableUser();
            }

            if (!ModelState.IsValid)
            {
                return ProblematicModelState(ModelState, "Some fields are invalid.");
            }

            var authUser = _facDBContext.Utilisateurs
                .Include(u => u.RoleUtilisateurs)
                .ThenInclude(ru => ru.IdRoleNavigation)
                .FirstOrDefault(u => u.IdUtilisateur == request.IdUser);
            if (authUser is null)
            {
                return UnknownUser();
            }

            int? idRole = authUser?.RoleUtilisateurs.FirstOrDefault()?.IdRole;
            if (idRole != 1)
            {
                return CustomForbid();
            }

            Utilisateur? existingUser = _facDBContext.Utilisateurs.FirstOrDefault(u => u.Identifiant == request.NewUserIdentifiant);
            if (existingUser is not null)
            {
                return Conflict(new
                {
                    status = 409,
                    error = "Conflict",
                    message = "L'identifiant d'utilisateur souhaité est déjà utilisé.",
                });
            }

            Utilisateur newUser = new Utilisateur
            {
                Identifiant = request.NewUserIdentifiant
            };
            newUser.MotDePasse = _hasher.HashPassword(newUser, request.NewUserMotDePasse);
            newUser.RoleUtilisateurs.Add(new RoleUtilisateur { IdRole = request.IdNewUserRole });
            _facDBContext.Utilisateurs.Add(newUser);
            await _facDBContext.SaveChangesAsync();

            return StatusCode(201, new
            {
                status = 201,
                error = "Creation Successful",
                message = "L'utilisateur a été créé avec succès.",
                data = newUser,
            });
        }


        // Private Methods
        private BadRequestObjectResult ProblematicModelState(ModelStateDictionary modelState, string inMessage)
        {
            var errorResponse = new
            {
                status = 400,
                title = inMessage,
                
                error = modelState.Where(x => x.Value != null && x.Value.Errors.Count > 0)
                .ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                )
            };
            return BadRequest(errorResponse);
        }

        private ObjectResult CustomForbid()
        {
            return StatusCode(403, new
            {
                status = 403,
                error = "Forbidden",
                message = "Vous n'êtes pas autorisé à accéder à cette ressource."
            });
        }

        private UnauthorizedObjectResult UnknownUser()
        {
            return Unauthorized(new
            {
                status = 401,
                error = "Not Authorized",
                message = "L'utilisateur tentant d'effectuer cette action n'est pas reconnu.",
            });
        }

        private UnauthorizedObjectResult NonAuthenticableUser()
        {
            return Unauthorized(new
            {
                status = 401,
                error = "Not Authorized",
                message = "Utilisateur non Authentifié.",
            });
        }
    }
}
