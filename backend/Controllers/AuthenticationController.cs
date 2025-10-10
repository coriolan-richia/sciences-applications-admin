using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController(FacContext facDBContext, IPasswordHasher<Utilisateur> hasher) : ControllerBase
    {
        private readonly FacContext _facDBContext = facDBContext;
        private readonly IPasswordHasher<Utilisateur> _hasher = hasher;

        [HttpGet("register")]
        public IActionResult Register()
        {
            var already = _facDBContext.Utilisateurs.SingleOrDefault(u => u.Identifiant == "admin");
            
            if (already is not null)
            {
                return BadRequest("L'utilisateur 'admin' existe déjà.");
            }

            var user = new Utilisateur { Identifiant = "admin" };
            user.MotDePasse = _hasher.HashPassword(user, "123456");
            _facDBContext.Utilisateurs.Add(user);
            _facDBContext.SaveChanges();

            return Ok("Utilisateur 'admin' créé avec succès.");
        }

        [HttpPost]
        public async Task<IActionResult> Connexion([FromBody] LoginRequest loginData)
        {
            if (string.IsNullOrWhiteSpace(loginData.Identifiant) || string.IsNullOrWhiteSpace(loginData.MotDePasse))
            {
                return BadRequest(new { message = "Identifiant et mot de passe requis." });
            }

            var user = await _facDBContext.Utilisateurs.FirstOrDefaultAsync(u => u.Identifiant == loginData.Identifiant);

            if (user == null)
            {
                return Unauthorized(new { message = "Identifiants incorrects." });
            }

            var result = _hasher.VerifyHashedPassword(user, user.MotDePasse, loginData.MotDePasse);

            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Identifiants incorrects." });
            }

            var userResponse = new
            {
                user.IdUtilisateur,
                user.Identifiant,
                user.RoleUtilisateurs
            };

            return Ok(userResponse);
        }

    }
}