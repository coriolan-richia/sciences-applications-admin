using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Appartenance
{
    public int IdAppartenance { get; set; }

    public string NomAppartenance { get; set; } = null!;

    public virtual ICollection<Cofac> Cofacs { get; set; } = new List<Cofac>();
}
