using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Note
{
    public int IdNote { get; set; }

    public decimal ValeurNote { get; set; }

    public bool? EstOptionnel { get; set; }

    public int? IdMatiere { get; set; }

    public int? IdBachelier { get; set; }
}
