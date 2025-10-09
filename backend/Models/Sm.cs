using System;
using System.Collections.Generic;

namespace PreregistrationsAdmin.Models;

public partial class Sm
{
    public int IdSms { get; set; }

    public string Envoyeur { get; set; } = null!;

    public string Recepteur { get; set; } = null!;

    public string? Contenu { get; set; }

    public DateOnly? DateSms { get; set; }
}
