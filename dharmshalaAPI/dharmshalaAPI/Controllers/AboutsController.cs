﻿using System;
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
    public class AboutsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AboutsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Abouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<About>>> GetAbout()
        {
          if (_context.About == null)
          {
              return NotFound();
          }
            return await _context.About.ToListAsync();
        }

        // GET: api/Abouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<About>> GetAbout(int id)
        {
          if (_context.About == null)
          {
              return NotFound();
          }
            var about = await _context.About.FindAsync(id);

            if (about == null)
            {
                return NotFound();
            }

            return about;
        }

        // PUT: api/Abouts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAbout(int id, About about)
        {
            if (id != about.Id)
            {
                return BadRequest(new { Message = "data not found!" });
            }


            about.UpdatedDate = DateTime.Now;
            _context.Entry(about).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AboutExists(id))
                {
                    return BadRequest(new { Message = "data not found!" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new {Message="Data has been Updated!"});
        }

        // POST: api/Abouts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<About>> PostAbout(About about)
        {
          if (_context.About == null)
          {
              return Problem("Entity set 'AppDbContext.About'  is null.");
          }

            about.CreatedDate = DateTime.Now;
            about.UpdatedDate = DateTime.Now;

            _context.About.Add(about);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAbout", new { id = about.Id }, about);
        }

        // DELETE: api/Abouts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAbout(int id)
        {
            if (_context.About == null)
            {
                return NotFound();
            }
            var about = await _context.About.FindAsync(id);
            if (about == null)
            {
                return NotFound();
            }

            _context.About.Remove(about);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AboutExists(int id)
        {
            return (_context.About?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
