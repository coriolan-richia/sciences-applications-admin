using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Laboratoire
{
    public string NomLabo { get; set; } = null!;

    public int? MentionRattachement { get; set; }

    public string? Description { get; set; }

    public int IdLabo { get; set; }

    public int? EcoleDoctoraleRattachement { get; set; }

    public string? Abbreviation { get; set; }

    public virtual EcoleDoctorale? EcoleDoctoraleRattachementNavigation { get; set; }

    public virtual ICollection<LaboMedium> LaboMedia { get; set; } = new List<LaboMedium>();

    public virtual Mention1? MentionRattachementNavigation { get; set; }

    public virtual ICollection<RespoLabo> RespoLabos { get; set; } = new List<RespoLabo>();
}
