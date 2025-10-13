namespace backend.DTOs;

public class UserForListing
{
    public int IdUtilisateur { get; set; }

    public string Identifiant { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
