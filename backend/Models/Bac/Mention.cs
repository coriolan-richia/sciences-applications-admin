using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Mention
{
    public int IdMention { get; set; }

    public string NomMention { get; set; } = null!;

    public int? Min { get; set; }

    public int? Max { get; set; }
}
