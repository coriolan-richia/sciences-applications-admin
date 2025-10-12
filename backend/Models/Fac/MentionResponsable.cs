using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class MentionResponsable
{
    public int IdRespoMention { get; set; }

    public int IdMention { get; set; }

    public int IdPersonne { get; set; }

    public DateOnly? DateDebut { get; set; }

    public DateOnly? DateFin { get; set; }

    public virtual Mention IdMentionNavigation { get; set; } = null!;

    public virtual Personne IdPersonneNavigation { get; set; } = null!;
}
