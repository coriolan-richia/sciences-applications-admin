using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class EcoleDoctorale
{
    public int IdEcoleDoctorale { get; set; }

    public string? NomEcoleDoctorale { get; set; }

    public virtual ICollection<Laboratoire> Laboratoires { get; set; } = new List<Laboratoire>();
}
