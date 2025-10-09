using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Mention1
{
    public int IdMention { get; set; }

    public string? NomMention { get; set; }

    public string Abbreviation { get; set; } = null!;

    public string? DescriptionMention { get; set; }

    public string? LogoPath { get; set; }

    public virtual ICollection<Laboratoire> Laboratoires { get; set; } = new List<Laboratoire>();

    public virtual ICollection<MentionNiveauParcour> MentionNiveauParcours { get; set; } = new List<MentionNiveauParcour>();

    public virtual ICollection<MentionResponsable> MentionResponsables { get; set; } = new List<MentionResponsable>();
}
