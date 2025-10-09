using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class RoleUtilisateur
{
    public int IdRoleUtilisateur { get; set; }

    public int IdRole { get; set; }

    public int IdUtilisateur { get; set; }

    public virtual Role IdRoleNavigation { get; set; } = null!;

    public virtual Utilisateur IdUtilisateurNavigation { get; set; } = null!;
}
