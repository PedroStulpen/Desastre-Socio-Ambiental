using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PetropolisApi.Data;
using PetropolisApi.Domain;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PetropolisApi.Controllers
{
    public record LoginRequest(
        string Login,
        string Senha
    );

    public record TrocarSenhaRequest(
        int Id,
        string Perfil,
        string Senha,
        string NovaSenha
    );

    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController (AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<object>> Login(LoginRequest req)
        {
            try
            {
                ILogavel? user = await _context.PontosApoio.FirstOrDefaultAsync(x => x.Celular == req.Login);
                if (user == null)
                    user = await _context.Transportes.FirstOrDefaultAsync(x => x.Celular == req.Login);

                if (user == null)
                    return BadRequest();
                if (user.Senha != Hash.Md5(req.Senha))
                    return BadRequest();

                var subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.MobilePhone, user.Celular),
                    new Claim(ClaimTypes.Role, user.Perfil),
                });

                var key = Encoding.ASCII.GetBytes(_configuration["JwtBearerTokenSettings:SecretKey"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = subject,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    Audience = _configuration["JwtBearerTokenSettings:Audience"],
                    Issuer = _configuration["JwtBearerTokenSettings:Issuer"],
                    //Expires = environment.IsDevelopment() || environment.IsStaging() ?
                    //    DateTime.UtcNow.AddYears(1) : DateTime.UtcNow.AddHours(6)
                    Expires = DateTime.UtcNow.AddMonths(1)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                    perfil = user.Perfil,
                    id = user.Id,
                    nome = user.Nome
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [Route("trocarsenha")]
        [HttpPut]
        public async Task<IActionResult> TrocarSenha(TrocarSenhaRequest req)
        {
            try
            {
                ILogavel? conta;
                if (req.Perfil == "PontoApoio")
                    conta = await _context.PontosApoio.FirstOrDefaultAsync(x => x.Id == req.Id);
                else
                    conta = await _context.Transportes.FirstOrDefaultAsync(x => x.Id == req.Id);

                if (conta == null)
                    return BadRequest("Nenhuma conta foi encontrada.");

                var hash = Hash.Md5(req.Senha);
                if (conta.Senha != hash)
                    return BadRequest("Senha incorreta.");

                hash = Hash.Md5(req.NovaSenha);
                conta.EditaSenha(hash);
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