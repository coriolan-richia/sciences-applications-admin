using System;
using System.Collections.Generic;

namespace backend.Models.Bac;

public partial class Etablissement
{
    public int IdEtablissement { get; set; }

    public string NomEtablissement { get; set; } = null!;
}
