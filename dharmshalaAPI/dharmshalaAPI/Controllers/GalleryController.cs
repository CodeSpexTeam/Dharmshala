using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dharmshalaAPI.Data;
using dharmshalaAPI.Model;
using dharmshalaAPI.HelperModal;
using dharmshalaAPI.Helper;

namespace dharmshalaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GalleryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Gallery
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gallery>>> GetGallery()
        {
          if (_context.Gallery == null)
          {
              return NotFound();
          }
            return await _context.Gallery.ToListAsync();
        }

        // GET: api/Gallery/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gallery>> GetGallery(int id)
        {
          if (_context.Gallery == null)
          {
              return NotFound();
          }
            var gallery = await _context.Gallery.FindAsync(id);

            if (gallery == null)
            {
                return NotFound();
            }

            return gallery;
        }

        // PUT: api/Gallery/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGallery(int id, Gallery gallery)
        {
            if (id != gallery.Id)
            {
                return BadRequest();
            }

            _context.Entry(gallery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GalleryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new {Message = "Record has been updated!"});
        }

        // POST: api/Gallery
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gallery>> PostGallery( [FromForm] GalleryModel galleryModel)
        {
          if (_context.Gallery == null)
          {
              return Problem("Entity set 'AppDbContext.Gallery'  is null.");
          }


            IFormFile imageName = galleryModel.ImageName;

            if (imageName == null || imageName.Length == 0)
            {
                return BadRequest("Please select an image to upload.");
            }


            List<String> supportedFormats = new List<string> { ".jpg", ".jpeg", ".png", ".gif" };
            if (!supportedFormats.Contains(Path.GetExtension(imageName.FileName.ToLower())))
            {
                return BadRequest("Invalid Image Format. Supported Formats:" + string.Join(",", supportedFormats));
            }



            ImageHelper imagehelper = new ImageHelper();
            var image = await imagehelper.StoreImage(imageName);

            if (imageName == null)
            {
                return BadRequest("Image Storage Failed!");
            }

            Gallery gallery = new Gallery()
            {
                Title = galleryModel.Title,
                Image = image,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            _context.Gallery.Add(gallery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGallery", new { id = gallery.Id }, gallery);

        }

        // DELETE: api/Gallery/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGallery(int id)
        {
            if (_context.Gallery == null)
            {
                return NotFound();
            }
            var gallery = await _context.Gallery.FindAsync(id);
            if (gallery == null)
            {
                return NotFound();
            }

            RemoveFile removeFile = new RemoveFile();

            var test = removeFile.RemoveFileFromFolder(@"D:\CodespexTeam Project\Dharmshala\Dharmshala\dharmshala\src\" + gallery.Image);

            _context.Gallery.Remove(gallery);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Gallery/image/6
        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteGalleryImage(int id)
        {
            if (_context.Gallery == null)
            {
                return BadRequest(new {Message="Not Found!"});
            }
            var gallery = await _context.Gallery.FindAsync(id);
            if (gallery == null)
            {
                return BadRequest(new { Message = "Not Found!" }); ;
            }

            RemoveFile removeFile = new RemoveFile();

            var test = removeFile.RemoveFileFromFolder(@"D:\CodespexTeam Project\Dharmshala\Dharmshala\dharmshala\src\" + gallery.Image);

            gallery.Image = null;
            gallery.UpdatedDate = DateTime.Now;
            _context.Gallery.Update(gallery);
            await _context.SaveChangesAsync();

            return Ok(gallery);
        }

        private bool GalleryExists(int id)
        {
            return (_context.Gallery?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
