using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class Parcour
{
    public int IdParcours { get; set; }

    public string? NomParcours { get; set; }

    public string? DescriptionParcours { get; set; }

    public virtual ICollection<MentionNiveauParcour> MentionNiveauParcours { get; set; } = new List<MentionNiveauParcour>();
}
