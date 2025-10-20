using backend.Context;
using backend.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController(FacContext facDBContext) : ControllerBase
    {
        private readonly FacContext _facDBContext = facDBContext;

        [HttpGet("list-stat")]
        public async Task<IActionResult> GetStat()
        {
            var preinscription = await _facDBContext.Preinscriptions.CountAsync();
            // var paiement = await _facDBContext.Preinscriptions.Sele
            return Ok(preinscription);
        }

    }
}