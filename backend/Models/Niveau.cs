using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Niveau
{
    public int IdNiveau { get; set; }

    public string? NomNiveau { get; set; }

    public virtual ICollection<MentionNiveauParcour> MentionNiveauParcours { get; set; } = new List<MentionNiveauParcour>();
}
