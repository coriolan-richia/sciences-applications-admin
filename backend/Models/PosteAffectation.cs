using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class PosteAffectation
{
    public int IdPostAffectation { get; set; }

    public string AbbreviationPost { get; set; } = null!;

    public string? NomPost { get; set; }

    public virtual ICollection<Pat> Pats { get; set; } = new List<Pat>();
}
