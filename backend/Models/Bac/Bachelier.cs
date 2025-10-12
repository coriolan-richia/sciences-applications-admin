using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Bachelier
{
    public int IdBachelier { get; set; }

    public DateOnly Annee { get; set; }

    public string NumeroCandidat { get; set; } = null!;

    public decimal Moyenne { get; set; }

    public int? IdPersonne { get; set; }

    public int? IdOption { get; set; }

    public int? IdCentre { get; set; }

    public int? IdEtablissement { get; set; }

    public int? IdMention { get; set; }
}
