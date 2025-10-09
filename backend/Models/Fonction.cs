using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Fonction
{
    public int IdFonction { get; set; }

    public string NomFonction { get; set; } = null!;

    public virtual ICollection<Dvc> Dvcs { get; set; } = new List<Dvc>();

    public virtual ICollection<Pat> Pats { get; set; } = new List<Pat>();
}
