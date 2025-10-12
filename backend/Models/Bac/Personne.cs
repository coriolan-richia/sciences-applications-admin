using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Personne
{
    public int IdPersonne { get; set; }

    public string NomPrenom { get; set; } = null!;

    public DateOnly DateNaissance { get; set; }

    public string LieuNaissance { get; set; } = null!;

    public string Sexe { get; set; } = null!;
}
