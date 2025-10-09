using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Paiement
{
    public int IdPaiement { get; set; }

    public string? NomPayeur { get; set; }

    public string? NomBeneficiaire { get; set; }

    public string? Agence { get; set; }

    public string? RefBancaire { get; set; }

    public DateOnly? DatePaiement { get; set; }

    public DateOnly? DateInsertion { get; set; }

    public int? Espece { get; set; }

    public int? IdPreinscription { get; set; }

    public string? MotifPaiement { get; set; }

    public int? IdUtilisateur { get; set; }

    public virtual Preinscription? IdPreinscriptionNavigation { get; set; }

    public virtual Utilisateur? IdUtilisateurNavigation { get; set; }
}
