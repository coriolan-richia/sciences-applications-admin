using backend.Context;
using backend.DTOs;
using backend.Models.Bac;
using backend.Models.Enums;
using backend.Models.Fac;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreinscriptionController(FacContext facDBContext, BacContext bacDBContext) : ControllerBase
    {
        private readonly FacContext _facDBContext = facDBContext;
        private readonly BacContext _bacDBContext = bacDBContext;
        

        [HttpPost("insert-preinscription")]
        public async Task<IActionResult> InsertPreinscription([FromBody] NewPreinscription request)
        {
            try
            {
                if (request == null)
                    return BadRequest("Invalid data");

                /* Quelques vérifications 
                    --> PayementReference existe ?
                    --> Les data de Bac dans Bacheliers ? 
                    --> already preinscrit in the options ?

                    /// Insértions :
                    --> bac d'abord si n'existe pas encore
                    --> puis preinscription
                */
                var ExistingPaymentReference = await _facDBContext.Preinscriptions.AnyAsync(pre => pre.RefBancaire == request.PaymentReference);
                if (ExistingPaymentReference)
                    return BadRequest("Référence paiement déjà utilisée");
                
                var bachelier = await _bacDBContext.Bacheliers.FirstOrDefaultAsync(b => b.Annee.Year.ToString() == request.BacYear && b.NumeroCandidat == request.BacNumber);
                if (bachelier == null)
                    return BadRequest("Candidat non trouvé dans la BD nationale des bacheliers");

                var existingBac = await _facDBContext.Bacs.FirstOrDefaultAsync(b => b.AnneeBacc.ToString() == request.BacYear && b.NumBacc.ToString() == request.BacNumber);
                int idBacFac;
                if (existingBac == null)
                {
                    var newBac = new Bac
                    {
                        AnneeBacc = int.Parse(request.BacYear),
                        NumBacc = int.Parse(request.BacNumber),
                        DocBac = "",
                        EstMalagasy = true
                    };
                    _facDBContext.Bacs.Add(newBac);
                    await _facDBContext.SaveChangesAsync();
                    idBacFac = newBac.IdBac;
                }
                else
                {
                    idBacFac = existingBac.IdBac;
                }

                bool alreadyPreinscrit = await _facDBContext.Preinscriptions.AnyAsync(p => p.IdBac == idBacFac && p.IdPortail == request.IdStudyBranch);

                if (alreadyPreinscrit)
                    return BadRequest("Candidat déjà préinscrit dans ce parcours");


                var newPreinscription = new Preinscription
                {
                    Email = request.Email,
                    Tel = request.Phone,
                    RefBancaire = request.PaymentReference,
                    Agence = request.PaymentAgence,
                    DatePaiement = request.PaymentDate,
                    DatePreinscription = request.PreregistrationDate,
                    IdPortail = request.IdStudyBranch,
                    IdBac = idBacFac,
                    EstSelectionner = false,
                    EstValide = false,
                    ModePreinscription = TypeModePreinscription.Poste
                };

                _facDBContext.Preinscriptions.Add(newPreinscription);
                await _facDBContext.SaveChangesAsync();

                return Ok(new
                {
                    message = "Préinscription enregistrée avec succès",
                    preinscription = newPreinscription
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }

        [HttpPost("get-adequate-parcours")]
        public async Task<IActionResult> GetAdequateParcours([FromBody] BacNumberToData request)
        {
            try
            {
                var bachelier = await _bacDBContext.Bacheliers.FirstOrDefaultAsync(b => b.NumeroCandidat == request.NumBacc && b.Annee.Year.ToString() == request.AnneeBacc);
                if (bachelier == null)
                    return NotFound(new { message = "bachelier not found" });
                var IdSerie = bachelier.IdOption;
                var parcoursList = await (
                        from ps in _facDBContext.PortailSeries
                        join p in _facDBContext.Portails on ps.IdPortail equals p.IdPortail
                        where ps.IdSerie == IdSerie
                        select new
                        {
                            p.IdPortail,
                            p.Abbreviation,
                            p.NomPortail
                        }).ToListAsync();

                if (parcoursList.Count == 0)
                    return Ok(new { message = "Aucun parcours adéquat trouvé pour cette série" });

                return Ok(new { parcoursList });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }

        [HttpPost("does-bac-exist")]
        public async Task<IActionResult> DoesBacExist([FromBody] BacNumberToData request)
        {
            try
            {
                bool exist = await _bacDBContext.Bacheliers.AnyAsync(b => b.NumeroCandidat == request.NumBacc && b.Annee.Year.ToString() == request.AnneeBacc);

                return Ok(new { exist });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }

        [HttpGet("listingall")]
        public async Task<IActionResult> ListingAll()
        {
            List<Preinscription> preinscriptions = await _facDBContext.Preinscriptions.ToListAsync();
            List<Bachelier> bacheliers = await _bacDBContext.Bacheliers.ToListAsync();
            List<Option> options = await _bacDBContext.Options.ToListAsync();
            List<Parcour> parcours = await _facDBContext.Parcours.ToListAsync();

            var result = (from p in preinscriptions
                          join b in bacheliers on p.IdBac equals b.IdBachelier
                          join o in options on b.IdOption equals o.IdOption
                          join pr in parcours on p.IdPortail equals pr.IdParcours into parcoursGroup
                          from pr in parcoursGroup.DefaultIfEmpty()
                          select new ListingModel
                          {
                              Id = p.IdPreinscription.ToString(),
                              BacNumber = b.NumeroCandidat,
                              BacYear = b.Annee.Year,
                              BacOption = o.Serie,
                              StudyBranch = pr.NomParcours ?? "No Parcour",
                              PreregistrationDate = p.DatePreinscription?.ToString() ?? "No Preregistration date",
                              Email = p.Email ?? "No Email Adress",
                              Phone = p.Tel ?? "No Phone Number",
                              PaymentDate = p.DatePaiement.ToString() ?? "No Payment date",
                              PaymentReference = p.RefBancaire,
                              PaymentAgence = p.Agence,
                              Status = p.EstValide ?? false ? "verified" : "pending"
                          }
            ).ToList();

            return Ok(result);
        }

        /*         [HttpPost("does-bac-exist")]
                public async Task<IActionResult> DoesBacExist([FromBody] BacNumberToData request)
                {
                    try
                    {
                        var bachelier = await (
                            from b in _bacDBContext.Bacheliers
                            join p in _bacDBContext.Personnes on b.IdPersonne equals p.IdPersonne
                            join m in _bacDBContext.Mentions on b.IdMention equals m.IdMention into mentionGroup
                            from m in mentionGroup.DefaultIfEmpty()
                            join o in _bacDBContext.Options on b.IdOption equals o.IdOption into optGroup
                            from o in optGroup.DefaultIfEmpty()
                            where b.NumeroCandidat == request.NumBacc
                                && b.Annee.Year.ToString() == request.AnneeBacc

                            select new
                            {
                                nom_prenom = p.NomPrenom,
                                date_naissance = p.DateNaissance,
                                lieu_naissance = p.LieuNaissance,
                                sexe = p.Sexe,
                                mention = m != null ? m.NomMention : null,
                                option = o != null ? o.Serie : null,
                                num_bacc = b.NumeroCandidat
                            }).FirstOrDefaultAsync();

                        if (bachelier == null)
                            return NotFound(new { message = "Aucun bachelier Trouver pour ce numéro et cette année" });

                        return Ok(bachelier);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
                    }
                } */


    }
}