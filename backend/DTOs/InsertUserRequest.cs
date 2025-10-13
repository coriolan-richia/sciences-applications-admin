namespace backend.DTOs;

public class InsertUserRequest
{
    
    public int IdUser { get; set; }
    public string NewUserIdentifiant { get; set; } = string.Empty;
    public string NewUserMotDePasse { get; set; } = string.Empty;
    public int IdNewUserRole { get; set; }
        
}
