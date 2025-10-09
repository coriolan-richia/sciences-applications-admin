using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Portail
{
    public int IdPortail { get; set; }

    public string NomPortail { get; set; } = null!;

    public string? Abbreviation { get; set; }

    public bool? EstAcademique { get; set; }

    public virtual ICollection<PortailSerie> PortailSeries { get; set; } = new List<PortailSerie>();

    public virtual ICollection<Preinscription> Preinscriptions { get; set; } = new List<Preinscription>();
}
