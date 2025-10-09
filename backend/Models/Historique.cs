using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Historique
{
    public int IdHistorique { get; set; }

    public int? AdminId { get; set; }

    public DateTime? DateEvenement { get; set; }

    public string? Description { get; set; }

    public int IdProvince { get; set; }

    public virtual Administration? Admin { get; set; }

    public virtual Province IdProvinceNavigation { get; set; } = null!;
}
