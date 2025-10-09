using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Grade
{
    public int IdGrade { get; set; }

    public string NomGrade { get; set; } = null!;

    public virtual ICollection<Pat> Pats { get; set; } = new List<Pat>();
}
