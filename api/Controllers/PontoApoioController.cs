using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetropolisApi.Data;
using PetropolisApi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetropolisApi.Controllers
{
    public record PontoApoioRequest(
        int Id,
        string Nome,
        string Responsavel,
        string Celular,
        string Endereco,
        string Bairro,
        string Referencia,
        string Senha,
        bool ContatoPrivado,
        ICollection<int> TiposVeiculos
    );

    [Route("[controller]")]
    [ApiController]
    public class PontoApoioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PontoApoioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PontoApoio>> GetPontoApoio(int id)
        {
            try
            {
                var ponto = await _context.PontosApoio
                    .Where(x => x.Id == id)
                    .Select(x => new 
                    {
                        x.Id,
                        x.Nome,
                        x.Celular,
                        x.Bairro,
                        x.Referencia,
                        x.Endereco,
                        x.Responsavel,
                        x.Perfil,
                        x.ContatoPrivado,
                        Veiculo = _context.PontosApoioVeiculos
                            .Where(y => y.PontoApoioId == x.Id)
                            .Select(y => y.VeiculoId)
                            .AsEnumerable()
                    })
                    .FirstOrDefaultAsync();
                if (ponto == null)
                {
                    return BadRequest("Ponto de Apoio não encontrado.");
                }

                return Ok(ponto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutPontoApoio(PontoApoioRequest req)
        {
            try
            {
                var ponto = _context.PontosApoio.FirstOrDefault(x => x.Id == req.Id);
                if (ponto == null)
                {
                    return BadRequest("Ponto de Apoio não encontrado.");
                }

                var existe = _context.PontosApoio.Any(x => x.Id != ponto.Id && x.Celular == req.Celular);
                if (existe)
                {
                    return BadRequest("Já existe um ponto de apoio com esse nome.");
                }

                ponto.Edita(req.Nome, req.Responsavel, req.Celular, req.Endereco, req.Bairro, req.Referencia, req.ContatoPrivado);

                if (!ponto.IsValid)
                {
                    return BadRequest(ponto.Notifications.ConvertToProblemDetails());
                }

                var veiculos = _context.PontosApoioVeiculos.Where(x => x.PontoApoioId == ponto.Id);
                _context.RemoveRange(veiculos);

                foreach (var idVeiculo in req.TiposVeiculos)
                {
                    var veiculoApoio = new PontoApoioVeiculo(idVeiculo, ponto.Id);
                    await _context.AddAsync(veiculoApoio);
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
        public async Task<IActionResult> PostPontoApoio(PontoApoioRequest req)
        {
            try
            {
                var ponto = new PontoApoio(0, req.Nome, req.Responsavel, req.Celular, req.Endereco, req.Bairro, req.Referencia, req.Senha, req.ContatoPrivado);
                if (!ponto.IsValid)
                {
                    return BadRequest(ponto.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.PontosApoio.FirstOrDefault(x => x.Celular == req.Celular);
                if (existe != null)
                {
                    return BadRequest("Ponto de Apoio já existente.");
                }

                ponto.Senha = Hash.Md5(req.Senha);
                await _context.AddAsync(ponto);

                foreach (var idVeiculo in req.TiposVeiculos)
                {
                    var veiculoApoio = new PontoApoioVeiculo(idVeiculo, ponto.Id);
                    veiculoApoio.PontoApoio = ponto;
                    await _context.AddAsync(veiculoApoio);
                }
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
