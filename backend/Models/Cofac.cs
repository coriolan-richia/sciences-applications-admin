using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Cofac
{
    public int IdCofac { get; set; }

    public int PersonneId { get; set; }

    public int AppartenanceId { get; set; }

    public DateOnly? DateCreation { get; set; }

    public virtual Appartenance Appartenance { get; set; } = null!;

    public virtual Personne1 Personne { get; set; } = null!;
}
