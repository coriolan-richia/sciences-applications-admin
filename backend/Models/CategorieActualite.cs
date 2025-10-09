using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CategorieActualite
{
    public int Id { get; set; }

    public string Nom { get; set; } = null!;

    public virtual ICollection<Actualite> Actualites { get; set; } = new List<Actualite>();
}
