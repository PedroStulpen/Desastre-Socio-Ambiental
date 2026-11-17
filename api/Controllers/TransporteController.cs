using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetropolisApi.Data;
using PetropolisApi.Domain;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PetropolisApi.Controllers
{
    public record TransporteRequest(
        int Id,
        string Nome,
        string Celular,
        int IdTipoVeiculo,
        string Senha,
        bool ContatoPrivado
    );

    [Route("[controller]")]
    [ApiController]
    public class TransporteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransporteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transporte>> GetTransporte(int id)
        {
            try
            {
                var trans = await _context.Transportes.FirstOrDefaultAsync(x => x.Id == id);
                if (trans == null)
                {
                    return BadRequest("Transporte não encontrado.");
                }

                return Ok(trans);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutTransporte(TransporteRequest req)
        {
            try
            {
                var transporte = _context.Transportes.FirstOrDefault(x => x.Id == req.Id);
                if (transporte == null)
                {
                    return BadRequest("Transporte não encontrado.");
                }

                var existe = _context.Transportes.Any(x => x.Id != transporte.Id && x.Celular == req.Celular);
                if (existe)
                {
                    return BadRequest("Já existe um transporte usando esse celular.");
                }

                transporte.Edita(req.Nome, req.Celular, req.IdTipoVeiculo, req.ContatoPrivado);

                if (!transporte.IsValid)
                {
                    return BadRequest(transporte.Notifications.ConvertToProblemDetails());
                }

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostTransporte(TransporteRequest req)
        {
            try
            {
                var transporte = new Transporte(0, req.Nome, req.Celular, req.IdTipoVeiculo, req.Senha, req.ContatoPrivado);
                if (!transporte.IsValid)
                {
                    return BadRequest(transporte.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.PontosApoio.FirstOrDefault(x => x.Celular == req.Celular);
                if (existe != null)
                {
                    return BadRequest("Transporte já existente.");
                }

                transporte.Senha = Hash.Md5(req.Senha);
                await _context.AddAsync(transporte);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
