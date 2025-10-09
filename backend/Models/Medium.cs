using System;
using System.Collections.Generic;
using PreregistrationsAdmin.Models.Enums;

namespace PreregistrationsAdmin.Models;

public partial class Medium
{
    public string Chemin { get; set; } = null!;

    public int? Media { get; set; }

    public int IdMedia { get; set; }

    public TypeMedia Mimetype { get; set; }

    public virtual ICollection<ActualiteMedium> ActualiteMedia { get; set; } = new List<ActualiteMedium>();

    public virtual ICollection<LaboMedium> LaboMedia { get; set; } = new List<LaboMedium>();
}
