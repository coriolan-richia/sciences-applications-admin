namespace backend.DTOs
{
    public class LoginRequest
    {
        public string Identifiant { get; set; } = string.Empty;
        public string MotDePasse { get; set; } = string.Empty;
    }
}