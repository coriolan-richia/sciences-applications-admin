using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;


namespace backend.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;
        public JwtService(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateToken(int userId,string identifiant)
        {
            var secretKey = _config["Jwt:Key"];
            var expireMinutesStr = _config["Jwt:ExpireMinutes"];

            if (string.IsNullOrEmpty(secretKey))
                throw new InvalidOperationException("The jwt key is missing in the appsettings.json");
            if (string.IsNullOrEmpty(expireMinutesStr) || !double.TryParse(expireMinutesStr, out var expireMinutes))
                throw new InvalidOperationException("The jwt expire minutes is missing in the appsettings.json");

            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                [
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ClaimTypes.Name, identifiant)
                ]),
                Expires = DateTime.UtcNow.AddMinutes(expireMinutes),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}