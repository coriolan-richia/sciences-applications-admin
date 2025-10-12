using backend.Context;
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
        public PreinscriptionController(FacContext facDBContext)
        {
            _facDBContext = facDBContext;
        }
        [HttpGet("listingall")]
        public async Task<IActionResult> ListingAll()
        {
            List<Preinscription> preinscriptions = await _facDBContext.Preinscriptions.ToListAsync();

            return Ok(preinscriptions);
        }
        
    }
}