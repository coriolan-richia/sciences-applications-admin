using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class PortailSerie
{
    public int IdPortserie { get; set; }

    public int IdPortail { get; set; }

    public int IdSerie { get; set; }

    public virtual Portail IdPortailNavigation { get; set; } = null!;

    public virtual Serie IdSerieNavigation { get; set; } = null!;
}
