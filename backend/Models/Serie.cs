using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Serie
{
    public int IdSerie { get; set; }

    public string? NomSerie { get; set; }

    public bool? EstTechnique { get; set; }

    public virtual ICollection<PortailSerie> PortailSeries { get; set; } = new List<PortailSerie>();
}
