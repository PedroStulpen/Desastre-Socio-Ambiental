using Microsoft.AspNetCore.Mvc;
using PetropolisApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetropolisApi.Controllers
{
    public record NecessidadeRequest(
        int Id,
        int ItemId,
        int PontoApoioId,
        int Quantidade,
        string Observacao
    );

    [Route("[controller]")]
    [ApiController]
    public class NecessidadeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NecessidadeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("geral/{id}")]
        public ActionResult<IEnumerable<object>> GetNecessidades(int id)
        {
            try
            {
                var excedentes = _context.Necessidades
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
        public ActionResult<IEnumerable<object>> GetNecessidade(int id)
        {
            try
            {
                var necessidades = _context.Necessidades
                    .Where(x => x.PontoApoioId == id)
                    .Where(x => x.Ativo)
                    .Select(x => new
                    {
                        x.Id,
                        x.Quantidade,
                        Item = x.Item!.Nome,
                        x.Observacao
                    });

                return Ok(necessidades);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutNecessidade(NecessidadeRequest req)
        {
            try
            {
                var necessidade = _context.Necessidades.FirstOrDefault(x => x.Id == req.Id);
                if (necessidade == null)
                {
                    return BadRequest("Excedente não encontrado.");
                }

                necessidade.Edita(req.ItemId, req.Quantidade, req.Observacao);

                if (!necessidade.IsValid)
                {
                    return BadRequest(necessidade.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.Necessidades.FirstOrDefault(x => x.Id != req.Id &&
                    x.PontoApoioId == req.PontoApoioId && x.ItemId == req.ItemId && x.Ativo);
                if (existe != null)
                {
                    return BadRequest("Já existe uma necessidade para esse item.");
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
        public async Task<IActionResult> PostNecessidade(NecessidadeRequest req)
        {
            try
            {
                var necessidade = new Domain.Necessidade(0, req.PontoApoioId, req.ItemId, req.Quantidade, req.Observacao, true);
                if (!necessidade.IsValid)
                {
                    return BadRequest(necessidade.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.Necessidades.FirstOrDefault(x => x.PontoApoioId == req.PontoApoioId && x.ItemId == req.ItemId && x.Ativo);
                if (existe != null)
                {
                    return BadRequest("Já existe uma necessidade para esse item.");
                }

                await _context.AddAsync(necessidade);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNecessidade(int id)
        {
            try
            {
                var necessidade = _context.Necessidades.FirstOrDefault(x => x.Id == id);
                if (necessidade == null)
                {
                    return BadRequest("Necessidade não encontrada.");
                }

                necessidade.Ativo = false;
                //_context.Remove(necessidade);
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
