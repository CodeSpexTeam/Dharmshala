using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dharmshalaAPI.Data;
using dharmshalaAPI.Model;

namespace dharmshalaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SocialMediaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/SocialMedia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMedia>>> GetSocialMedia()
        {
          if (_context.SocialMedia == null)
          {
              return NotFound();
          }
            return await _context.SocialMedia.ToListAsync();
        }

        // GET: api/SocialMedia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SocialMedia>> GetSocialMedia(int id)
        {
          if (_context.SocialMedia == null)
          {
              return NotFound();
          }
            var socialMedia = await _context.SocialMedia.FindAsync(id);

            if (socialMedia == null)
            {
                return NotFound();
            }

            return socialMedia;
        }

        // PUT: api/SocialMedia/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocialMedia(int id, SocialMedia socialMedia)
        {
            if (id != socialMedia.Id)
            {
                return BadRequest();
            }

            _context.Entry(socialMedia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialMediaExists(id))
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

        // POST: api/SocialMedia
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SocialMedia>> PostSocialMedia(SocialMedia socialMedia)
        {
          if (_context.SocialMedia == null)
          {
              return Problem("Entity set 'AppDbContext.SocialMedia'  is null.");
          }
            socialMedia.CreatedDate = DateTime.Now;
            socialMedia.UpdatedDate = DateTime.Now;
            _context.SocialMedia.Add(socialMedia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSocialMedia", new { id = socialMedia.Id }, socialMedia);
        }

        // DELETE: api/SocialMedia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialMedia(int id)
        {
            if (_context.SocialMedia == null)
            {
                return NotFound();
            }
            var socialMedia = await _context.SocialMedia.FindAsync(id);
            if (socialMedia == null)
            {
                return NotFound();
            }

            _context.SocialMedia.Remove(socialMedia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SocialMediaExists(int id)
        {
            return (_context.SocialMedia?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
