using System.ComponentModel;
using backend.Context;
using backend.DTOs;
using backend.Models.Bac;
using backend.Models.Fac;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreinscriptionController : ControllerBase
    {
        private readonly FacContext _facDBContext;
        private readonly BacContext _bacDBContext;
        public PreinscriptionController(FacContext facDBContext, BacContext bacDBContext)
        {
            _facDBContext = facDBContext;
            _bacDBContext = bacDBContext;
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