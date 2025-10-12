using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class MentionNiveauParcour
{
    public int IdMnp { get; set; }

    public int IdParcours { get; set; }

    public int IdMention { get; set; }

    public int IdNiveau { get; set; }

    public int? IdParcoursProfessionnalisante { get; set; }

    public int? IdSpecialite { get; set; }

    public virtual Mention IdMentionNavigation { get; set; } = null!;

    public virtual Niveau IdNiveauNavigation { get; set; } = null!;

    public virtual Parcour IdParcoursNavigation { get; set; } = null!;

    public virtual ParcoursProfessionnalisante? IdParcoursProfessionnalisanteNavigation { get; set; }

    public virtual Specialite? IdSpecialiteNavigation { get; set; }
}
