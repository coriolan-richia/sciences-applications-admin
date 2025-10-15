using System;
using System.Collections.Generic;

namespace backend.Models.Fac;

public partial class HistoriquePaiement
{
    public int IdHistorique { get; set; }

    public string? CheminFichier { get; set; }

    public DateTime? DateImportation { get; set; }

    public bool? EstImporte { get; set; }

    public int? NbrLigne { get; set; }
}
