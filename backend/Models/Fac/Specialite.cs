using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class Specialite
{
    public int IdSpecialite { get; set; }

    public string NomSpecialite { get; set; } = null!;

    public virtual ICollection<MentionNiveauParcour> MentionNiveauParcours { get; set; } = new List<MentionNiveauParcour>();
}
