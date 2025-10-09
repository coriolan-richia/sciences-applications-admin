using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class RespoLabo
{
    public int IdRespoLabo { get; set; }

    public int? Responsable { get; set; }

    public DateTime? DateDebut { get; set; }

    public DateTime? DateFin { get; set; }

    public int? IdLabo { get; set; }

    public virtual Laboratoire? IdLaboNavigation { get; set; }

    public virtual Personne1? ResponsableNavigation { get; set; }
}
