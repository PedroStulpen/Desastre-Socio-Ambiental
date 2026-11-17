using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetropolisApi.Data;
using PetropolisApi.Domain;

namespace PetropolisApi.Controllers
{
    public record ItemRequest(
        int Id,
        string Nome
    );

    [Route("[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> GetItens()
        {
            try
            {
                var itens = _context.Itens
                    .Where(x => x.Ativo)
                    .Select(x => new
                    {
                        x.Id,
                        x.Nome
                    });

                return Ok(itens);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutItem(ItemRequest req)
        {
            try
            {
                var item = _context.Itens.FirstOrDefault(x => x.Id == req.Id);
                if (item == null)
                {
                    return BadRequest("Item não encontrado.");
                }

                var existe = _context.Itens.Any(x => x.Id != req.Id && x.Nome.ToLower() == req.Nome.ToLower());
                if (existe)
                {
                    return BadRequest("Já existe um item com nome igual.");
                }

                item.Edita(req.Nome);

                if (!item.IsValid)
                {
                    return BadRequest(item.Notifications.ConvertToProblemDetails());
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
        public async Task<IActionResult> PostItem(ItemRequest req)
        {
            try
            {
                var item = new Item(0, req.Nome, true);
                if (!item.IsValid)
                {
                    return BadRequest(item.Notifications.ConvertToProblemDetails());
                }

                var existe = _context.Itens.Any(x => x.Nome.ToLower() == req.Nome.ToLower());
                if (existe)
                {
                    return BadRequest("Já existe um item com nome igual.");
                }

                await _context.AddAsync(item);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            try
            {
                var item = _context.Itens.FirstOrDefault(x => x.Id == id);
                if (item == null)
                    return BadRequest("Item não encontrado.");

                var emUso = _context.Necessidades.Any(x => x.ItemId == id) ||
                    _context.Excedentes.Any(x => x.ItemId == id);

                if (emUso)
                    item.Ativo = false;
                else
                    _context.Remove(item);

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
