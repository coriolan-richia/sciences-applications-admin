using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class LaboMedium
{
    public int Media { get; set; }

    public int Labo { get; set; }

    public int IdLaboMedia { get; set; }

    public virtual Laboratoire LaboNavigation { get; set; } = null!;

    public virtual Medium MediaNavigation { get; set; } = null!;
}
