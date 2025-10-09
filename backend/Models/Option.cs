using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Option
{
    public int IdOption { get; set; }

    public string Serie { get; set; } = null!;

    public virtual ICollection<Bachelier> Bacheliers { get; set; } = new List<Bachelier>();
}
