using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Professeur
{
    public int IdProfesseur { get; set; }

    public int Personne { get; set; }

    public int Titre { get; set; }

    public virtual Personne1 PersonneNavigation { get; set; } = null!;

    public virtual TitreProfesseur TitreNavigation { get; set; } = null!;
}
