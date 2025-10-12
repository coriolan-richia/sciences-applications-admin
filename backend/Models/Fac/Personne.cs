using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class Personne
{
    public int IdPersonne { get; set; }

    public string Nom { get; set; } = null!;

    public string? Email { get; set; }

    public string? Tel { get; set; }

    public string? Prenom { get; set; }

    public DateTime? DateInsertion { get; set; }

    public int? IdLabo { get; set; }

    public virtual ICollection<Cofac> Cofacs { get; set; } = new List<Cofac>();

    public virtual ICollection<Dvc> Dvcs { get; set; } = new List<Dvc>();

    public virtual ICollection<MentionResponsable> MentionResponsables { get; set; } = new List<MentionResponsable>();

    public virtual ICollection<Pat> Pats { get; set; } = new List<Pat>();

    public virtual ICollection<Professeur> Professeurs { get; set; } = new List<Professeur>();

    public virtual ICollection<RespoLabo> RespoLabos { get; set; } = new List<RespoLabo>();
}
