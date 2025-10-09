using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Matiere
{
    public int IdMatiere { get; set; }

    public string NomMatiere { get; set; } = null!;

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
}
