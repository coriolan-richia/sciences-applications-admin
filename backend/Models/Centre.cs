using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Centre
{
    public int IdCentre { get; set; }

    public string NomCentre { get; set; } = null!;

    public int? IdProvince { get; set; }

    public virtual ICollection<Bachelier> Bacheliers { get; set; } = new List<Bachelier>();

    public virtual Province? IdProvinceNavigation { get; set; }
}
