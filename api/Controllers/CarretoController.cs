using Microsoft.AspNetCore.Mvc;
using PetropolisApi.Data;
using PetropolisApi.Domain;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PetropolisApi.Controllers
{
    public record CarretoRequest(
        int Id,
        int TransporteId,
        int ExcedenteId,
        int NecessidadeId,
        int Quantidade
    );

    [Route("[controller]")]
    [ApiController]
    public class CarretoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarretoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostCarreto(CarretoRequest req)
        {
            try
            {
                var frete = new Carreto(0, req.TransporteId, req.ExcedenteId, req.NecessidadeId, req.Quantidade, DateTime.Now);
                if (!frete.IsValid)
                {
                    return BadRequest(frete.Notifications.ConvertToProblemDetails());
                }

                var excedente = _context.Excedentes.FirstOrDefault(x => x.Id == req.ExcedenteId);
                if (excedente == null)
                    return BadRequest("Excedente não encontrado.");

                var qtd = _context.Carretos
                    .Where(x => x.ExcedenteId == req.ExcedenteId && !x.Saiu)
                    .Sum(x => x.Quantidade);
                if (excedente.Quantidade < (req.Quantidade + qtd))
                    return BadRequest("Não há itens suficientes.");

                var necessidade = _context.Necessidades.FirstOrDefault(x => x.Id == req.NecessidadeId);
                if (necessidade == null)
                    return BadRequest("Necessidade não encontrada.");

                qtd = _context.Carretos
                    .Where(x => x.NecessidadeId == req.NecessidadeId && !x.Entrou)
                    .Sum(x => x.Quantidade);
                if (necessidade.Quantidade < (req.Quantidade + qtd))
                    return BadRequest("Está levando mais do que o necessário.");

                await _context.AddAsync(frete);
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
