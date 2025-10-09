using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ParcoursProfessionnalisante
{
    public int IdParcoursProfessionnalisante { get; set; }

    public string NomParcoursProfessionnalisante { get; set; } = null!;

    public virtual ICollection<MentionNiveauParcour> MentionNiveauParcours { get; set; } = new List<MentionNiveauParcour>();
}
