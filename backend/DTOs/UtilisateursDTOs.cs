using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Utilisateur;

public class UserForListing
{
    public int IdUtilisateur { get; set; }

    public string Identifiant { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public class DeleteUserRequest
{
    public int AuthId { get; set; }
    public int TargetId { get; set; }
}

public class GetOneUserRequest
{
    public int AuthId { get; set; }
    public int TargetId { get; set; }
}

public class UpdateUserRequest
{
    public int AuthId { get; set; }
    public string TargetIdentifiant { get; set; } = string.Empty;
    public string? Password { get; set; }
    public int? RoleId { get; set; }
}

public class GetOneUserResponse
{
    public int IdUser { get; set; }
    public string Identifiant { get; set; } = string.Empty;
    public int IdRole { get; set; }
}

public class ListUsersRequest
{
    public int authId { get; set; }
}

public class InsertUserRequest
{
    
    public int? IdUser { get; set; }
    
    [Required(ErrorMessage = "L'identifiant est obligatoire.")]
    public string NewUserIdentifiant { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Le mot de passe est obligatoire.")]
    public string NewUserMotDePasse { get; set; } = string.Empty;

    [Required(ErrorMessage = "Un rôle pour l'utilisateur est obligatoire.")]
    public int IdNewUserRole { get; set; }
        
}