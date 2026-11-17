using Microsoft.AspNetCore.Mvc;
using PetropolisApi.Data;
using PetropolisApi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetropolisApi.Controllers
{
    public record ExcedenteRequest(
        int Id,
        int ItemId,
        int PontoApoioId,
        int Quantidade,
        string Observacao
    );

    [Route("[controller]")]
    [ApiController]
    public class ExcedenteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExcedenteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("geral/{id}")]
        public ActionResult<IEnumerable<object>> GetExcedentes(int id)
        {
            try
            {
                var excedentes = _context.Excedentes
                    .Where(x => id == 0 || x.ItemId == id)
                    .Where(x => x.Ativo)
                    .Select(x => new
                    {
                        x.Id,
                        x.Quantidade,
                        x.ItemId,
                        ItemNome = x.Item!.Nome,
                        x.PontoApoioId,
                        PontoApoioNome = x.PontoApoio!.Nome,
                        PontoApoioEndereco = x.PontoApoio.Endereco,
                        PontoApoioBairro = x.PontoApoio.Bairro,
                        x.Observacao,
                        Veiculo = _context.PontosApoioVeiculos
                            .Where(y => y.PontoApoioId == x.PontoApoioId)
                            .Join(_context.Veiculos, a => a.VeiculoId, b => b.Id, (a, b) => b)
                            .Select(y => y.Nome)
                            .AsEnumerable()
                    });

                return Ok(excedentes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("{id}")]
        public ActionResult<object> GetExcedente(int id)
        {
            try
            {
                var excedentes = _context.Excedentes
                    .Where(x => x.PontoApoioId == id)
                    .Where(x => x.Ativo)
                    .Select(x => new
                    {
                        x.Id,
                        x.Quantidade,
                        Item = x.Item!.Nome,
                        x.Observacao
                    });

                return Ok(excedentes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutExcedente(ExcedenteRequest req)
        {
            try
            {
                var excedente = _context.Excedentes.FirstOrDefault(x => x.Id == req.Id);
                if (excedente == null)
                {
                    return BadRequest("Excedente não encontrado.");
                }

                excedente.Edita(req.ItemId, req.Quantidade, req.Observacao);

                if (!excedente.IsValid)
                {
                    return BadRequest(excedente.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.Excedentes.FirstOrDefault(x => x.Id != req.Id &&
                    x.PontoApoioId == req.PontoApoioId && x.ItemId == req.ItemId && x.Ativo);
                if (existe != null)
                {
                    return BadRequest("Já existe um excedente para esse item.");
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
        public async Task<IActionResult> PostExcedente(ExcedenteRequest req)
        {
            try
            {
                var excedente = new Excedente(0, req.PontoApoioId, req.ItemId, req.Quantidade, req.Observacao, true);
                if (!excedente.IsValid)
                {
                    return BadRequest(excedente.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.Excedentes.FirstOrDefault(x => x.PontoApoioId == req.PontoApoioId && x.ItemId == req.ItemId && x.Ativo);
                if (existe != null)
                {
                    return BadRequest("Já existe um excedente para esse item.");
                }

                await _context.AddAsync(excedente);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExcedente(int id)
        {
            try
            {
                var excedente = _context.Excedentes.FirstOrDefault(x => x.Id == id);
                if (excedente == null)
                {
                    return BadRequest("Excedente não encontrado.");
                }

                excedente.Ativo = false;
                //_context.Remove(excedente);
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
