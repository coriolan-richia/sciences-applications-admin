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

        [HttpPost("get-one-preinscription")]
        public async Task<IActionResult> GetOnePreinscription([FromBody] int PreregistrationId)
        {
            try
            {
                Preinscription? preinscription = await _facDBContext.Preinscriptions.FirstOrDefaultAsync(p => p.IdPreinscription == PreregistrationId);
                if (preinscription is null)
                {
                    return NotFound();
                }
                
                return Ok(preinscription);
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }

        [HttpPost("insert-preinscription")]
        public async Task<IActionResult> InsertPreinscription([FromBody] NewPreinscription request)
        {
            try
            {

                // request.Email = "test@example.com"; request.Phone = "0612345678"; request.BacYear = "2025"; request.BacNumber = "3002042"; request.IdStudyBranch = 5; request.PreregistrationDate = DateTime.Now; request.PaymentReference = "PAY123KK256789"; request.PaymentAgence = "Wafacash"; request.PaymentDate = DateTime.Now;
                if (request == null)
                    return BadRequest("Invalid data");

                /* Quelques vérifications 
                    --> Email verification si !null ?
                    --> PayementReference existe ?
                    --> Parcours existe ?
                    --> Les data de Bac dans Bacheliers ? 
                    --> already preinscrit in the options ?
            
                    /// Insértions :
                    --> bac d'abord si n'existe pas encore
                    --> puis preinscription
                */
                if (request.Email == null)
                    return BadRequest("Le champ Email doit être rempli");
                
                var ExistingPaymentReference = await _facDBContext.Preinscriptions.AnyAsync(pre => pre.RefBancaire == request.PaymentReference);
                if (ExistingPaymentReference)
                    return BadRequest("Référence paiement déjà utilisée");

                var parcour = await _facDBContext.Portails.FirstOrDefaultAsync(p => p.IdPortail == request.IdStudyBranch);
                if (parcour == null)
                    return BadRequest("Portail non existant pour cette preinscription");

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

        [HttpGet("list-all")]
        public async Task<IActionResult> ListingAll()
        {
            List<Preinscription> preinscriptions = await _facDBContext.Preinscriptions.ToListAsync();
            List<Bachelier> bacheliers = await _bacDBContext.Bacheliers.ToListAsync();
            List<Option> options = await _bacDBContext.Options.ToListAsync();
            List<Portail> portails = await _facDBContext.Portails.ToListAsync();
            List<Bac> bacs = await _facDBContext.Bacs.ToListAsync();

            var result = (
                from p in preinscriptions
                join ba in bacs on p.IdBac equals ba.IdBac
                join b in bacheliers on ba.NumBacc.ToString() equals b.NumeroCandidat
                // join b in bacheliers
                //     on new { Num = ba.NumBacc.ToString(), Annee = ba.AnneeBacc } 
                //     equals new { Num = b.NumeroCandidat, Annee = b.Annee.Year }
                join o in options on b.IdOption equals o.IdOption
                join pr in portails on p.IdPortail equals pr.IdPortail into parcoursGroup
                from pr in parcoursGroup.DefaultIfEmpty()
                select new ListingModel
                {
                    Id = p.IdPreinscription.ToString(),
                    BacNumber = b.NumeroCandidat,
                    BacYear = b.Annee.Year,
                    BacOption = o.Serie,
                    StudyBranch = pr.NomPortail ?? "Non disponible",
                    StudyBranchAbbrev = pr.Abbreviation ?? "N/A",
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

    }
}