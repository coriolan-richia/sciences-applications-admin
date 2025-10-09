using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Province
{
    public int IdProvince { get; set; }

    public string NomProvince { get; set; } = null!;

    public virtual ICollection<Centre> Centres { get; set; } = new List<Centre>();

    public virtual ICollection<Historique> Historiques { get; set; } = new List<Historique>();
}
