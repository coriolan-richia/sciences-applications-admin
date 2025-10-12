using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class Actualite
{
    public int IdActualite { get; set; }

    public string Titre { get; set; } = null!;

    public int IdCategorie { get; set; }

    public string? Description { get; set; }

    public string? Contenu { get; set; }

    public DateTime? DateCreation { get; set; }

    public DateTime? DateMiseAJour { get; set; }

    public DateTime? DateCommencement { get; set; }

    public DateTime? DateFin { get; set; }

    public string? Lieu { get; set; }

    public DateTime? DatePublication { get; set; }

    public DateTime? DateArchivage { get; set; }

    public bool IsUrgent { get; set; }

    public virtual ICollection<ActualiteMedium> ActualiteMedia { get; set; } = new List<ActualiteMedium>();

    public virtual CategorieActualite IdCategorieNavigation { get; set; } = null!;
}
