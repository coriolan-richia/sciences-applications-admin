using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Role
{
    public int IdRole { get; set; }

    public string? NomRole { get; set; }

    public virtual ICollection<RoleUtilisateur> RoleUtilisateurs { get; set; } = new List<RoleUtilisateur>();
}
