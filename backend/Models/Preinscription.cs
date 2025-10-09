using System;
using System.Collections.Generic;
using backend.Models.Enums;

namespace backend.Models;

public partial class Preinscription
{
    public int IdPreinscription { get; set; }

    public string? Email { get; set; }

    public string? Tel { get; set; }

    public string RefBancaire { get; set; } = null!;

    public string Agence { get; set; } = null!;

    public DateTime DatePaiement { get; set; }

    public DateTime? DatePreinscription { get; set; }

    public DateTime? DateValidation { get; set; }

    public bool? EstSelectionner { get; set; }

    public int? IdPortail { get; set; }

    public DateOnly? DateSelection { get; set; }

    public bool? EstValide { get; set; }

    public int? AdminValidation { get; set; }

    public int? IdBac { get; set; }

    public TypeModePreinscription ModePreinscription { get; set; } = TypeModePreinscription.Enligne;

    public virtual Utilisateur? AdminValidationNavigation { get; set; }

    public virtual Bac? IdBacNavigation { get; set; }

    public virtual Portail? IdPortailNavigation { get; set; }

    public virtual ICollection<Paiement> Paiements { get; set; } = new List<Paiement>();
}
