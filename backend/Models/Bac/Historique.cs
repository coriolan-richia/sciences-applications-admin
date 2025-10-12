using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Historique
{
    public int IdHistorique { get; set; }

    public int? AdminId { get; set; }

    public DateTime? DateEvenement { get; set; }

    public string? Description { get; set; }

    public int IdProvince { get; set; }
}
