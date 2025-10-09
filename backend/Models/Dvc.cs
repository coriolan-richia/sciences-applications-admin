using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Dvc
{
    public int IdDvcs { get; set; }

    public int IdPersonne { get; set; }

    public int IdFonction { get; set; }

    public DateTime? DateDebut { get; set; }

    public DateTime? DateFin { get; set; }

    public virtual Fonction IdFonctionNavigation { get; set; } = null!;

    public virtual Personne1 IdPersonneNavigation { get; set; } = null!;
}
