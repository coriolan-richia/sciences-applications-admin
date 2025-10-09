using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class MentionResponsable
{
    public int IdRespoMention { get; set; }

    public int IdMention { get; set; }

    public int IdPersonne { get; set; }

    public DateOnly? DateDebut { get; set; }

    public DateOnly? DateFin { get; set; }

    public virtual Mention1 IdMentionNavigation { get; set; } = null!;

    public virtual Personne1 IdPersonneNavigation { get; set; } = null!;
}
