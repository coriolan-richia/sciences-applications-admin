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
        public PreinscriptionController(FacContext facDBContext,BacContext bacDBContext)
        {
            _facDBContext = facDBContext;
            _bacDBContext = bacDBContext;
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
                            join pr in parcours on p.IdPortail equals pr.IdParcours
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
        
    }
}