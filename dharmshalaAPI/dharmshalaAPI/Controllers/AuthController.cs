using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dharmshalaAPI.Data;
using dharmshalaAPI.Model;
using dharmshalaAPI.Helper;
using System.Text;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using NuGet.Packaging.Signing;
using Microsoft.IdentityModel.Tokens;

namespace dharmshalaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Auth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auth>>> GetAuth()
        {
          if (_context.Auth == null)
          {
              return NotFound();
          }
            return await _context.Auth.ToListAsync();
        }

        // GET: api/Auth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Auth>> GetAuth(int id)
        {
          if (_context.Auth == null)
          {
              return NotFound();
          }
            var auth = await _context.Auth.FindAsync(id);

            if (auth == null)
            {
                return NotFound();
            }

            return auth;
        }

        // PUT: api/Auth/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuth(int id, Auth auth)
        {
            if (id != auth.Id)
            {
                return BadRequest();
            }

            _context.Entry(auth).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Auth
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Auth>> PostAuth(Auth auth)
        {
          if (_context.Auth == null)
          {
              return Problem("Entity set 'AppDbContext.Auth'  is null.");
          }

            //check Email

            if( await CheckEmailExit(auth.Members.Email))
            {
                return BadRequest(new { Message = "Email Already Exist!" });
            }


           var pass =  CheckPasswordStrength(auth.Password);
                
            if(!string.IsNullOrEmpty(pass))
                return BadRequest(new {Message = pass.ToString()});

            auth.Password = PasswordHasher.HashPassword(auth.Password);
            auth.Members.Role = "Admin";
            auth.Token = "";
            auth.Members.Created =  DateTime.Now;
            auth.Members.Updated = DateTime.Now;

            
            _context.Auth.Add(auth);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuth", new { id = auth.Id,
            Message ="Account is Created Successful!"}, auth);
        }




        // POST: api/Auth
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Login")]
        public async Task<ActionResult> Login(string email, string password)
        {
          var adminDetail =  await _context.Auth.FirstOrDefaultAsync(m => m.Members.Email == email);

            if (adminDetail== null)
            {
                return NotFound(new
                {
                   Message = "Please Enter Valid "
                });
            }


            if(!PasswordHasher.VerifyPassword(password, adminDetail.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }


            
            return Ok( new { Token = "",
                Message = "Login Success"
            });
        }






        // DELETE: api/Auth/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuth(int id)
        {
            if (_context.Auth == null)
            {
                return NotFound();
            }
            var auth = await _context.Auth.FindAsync(id);
            if (auth == null)
            {
                return NotFound();
            }

            _context.Auth.Remove(auth);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuthExists(int id)
        {
            return (_context.Auth?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        private async Task<bool> CheckEmailExit(string email)
        {
            return await _context.Auth.AnyAsync(e => e.Members.Email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if(password.Length <8)
            {
                sb.Append("Password should be greater than 8"+ Environment.NewLine);
            }

            if(!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("Password Should be Alphanumeric " + Environment.NewLine);
            }


            if(!Regex.IsMatch(password, "[@,!,#,$,%,^,&,*,<,>,~,`]"))
            {
                sb.Append("Password Should be contain special chars! " + Environment.NewLine);
            }

            return sb.ToString();
        }


        private string CreateJwt(Auth auth)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryveryscecret.....");

            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, auth.Members.Role),
                new Claim(ClaimTypes.Email, auth.Members.Email)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);

            var tokenDesciptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDesciptor);

            return jwtTokenHandler.WriteToken(token);

        }
    }
}
