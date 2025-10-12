using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Centre
{
    public int IdCentre { get; set; }

    public string NomCentre { get; set; } = null!;

    public int? IdProvince { get; set; }
}
