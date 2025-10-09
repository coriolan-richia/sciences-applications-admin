using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Bac
{
    public int IdBac { get; set; }

    public int AnneeBacc { get; set; }

    public int NumBacc { get; set; }

    public string? DocBac { get; set; }

    public bool? EstMalagasy { get; set; }

    public virtual ICollection<Preinscription> Preinscriptions { get; set; } = new List<Preinscription>();
}
