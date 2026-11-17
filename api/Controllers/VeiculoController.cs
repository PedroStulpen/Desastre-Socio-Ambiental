using Microsoft.AspNetCore.Mvc;
using PetropolisApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PetropolisApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VeiculoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VeiculoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> GetVeiculos()
        {
            try
            {
                var veiculos = _context.Veiculos
                    .Where(x => x.Ativo)
                    .Select(x => new
                    {
                        x.Id,
                        x.Nome
                    });

                return Ok(veiculos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
