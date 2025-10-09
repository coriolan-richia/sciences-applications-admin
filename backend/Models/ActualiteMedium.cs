using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class ActualiteMedium
{
    public int Id { get; set; }

    public int IdActualite { get; set; }

    public int IdMedia { get; set; }

    public virtual Actualite IdActualiteNavigation { get; set; } = null!;

    public virtual Medium IdMediaNavigation { get; set; } = null!;
}
