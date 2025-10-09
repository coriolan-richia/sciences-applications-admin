using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Pat
{
    public int IdPat { get; set; }

    public int IdPersonne { get; set; }

    public int IdPostAffectation { get; set; }

    public int IdGrade { get; set; }

    public int IdFonction { get; set; }

    public DateTime? DateDebut { get; set; }

    public DateTime? DateFin { get; set; }

    public virtual Fonction IdFonctionNavigation { get; set; } = null!;

    public virtual Grade IdGradeNavigation { get; set; } = null!;

    public virtual Personne1 IdPersonneNavigation { get; set; } = null!;

    public virtual PosteAffectation IdPostAffectationNavigation { get; set; } = null!;
}
