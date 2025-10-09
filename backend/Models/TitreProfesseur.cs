using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TitreProfesseur
{
    public int IdTitre { get; set; }

    public string? NomTitre { get; set; }

    public virtual ICollection<Professeur> Professeurs { get; set; } = new List<Professeur>();
}
