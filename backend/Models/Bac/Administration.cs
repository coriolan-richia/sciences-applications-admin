using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Administration
{
    public int IdAdmin { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Description { get; set; }
}
