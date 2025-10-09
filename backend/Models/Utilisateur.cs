using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Utilisateur
{
    public int IdUtilisateur { get; set; }

    public string Identifiant { get; set; } = null!;

    public string MotDePasse { get; set; } = null!;

    public virtual ICollection<Paiement> Paiements { get; set; } = new List<Paiement>();

    public virtual ICollection<Preinscription> Preinscriptions { get; set; } = new List<Preinscription>();

    public virtual ICollection<RoleUtilisateur> RoleUtilisateurs { get; set; } = new List<RoleUtilisateur>();
}
