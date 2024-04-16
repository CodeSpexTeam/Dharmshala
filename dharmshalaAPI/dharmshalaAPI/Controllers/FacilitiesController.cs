using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dharmshalaAPI.Data;
using dharmshalaAPI.Model;
using Microsoft.AspNetCore.Authorization;
using dharmshalaAPI.Helper;
using dharmshalaAPI.HelperModal;

namespace dharmshalaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacilitiesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Facilities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facility>>> GetFacilities()
        {
          if (_context.Facilities == null)
          {
              return NotFound();
          }
            return await _context.Facilities.ToListAsync();
        }

        // GET: api/Facilities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Facility>> GetFacility(int id)
        {
          if (_context.Facilities == null)
          {
              return NotFound();
          }
            var facility = await _context.Facilities.FindAsync(id);

            if (facility == null)
            {
                return NotFound();
            }

            return facility;
        }

        // PUT: api/Facilities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacility(int id, [FromForm] FacilityModel facilityModel)
        {
            if (id != facilityModel.Id)
            {
                return BadRequest(new {Message="Not Found!"});
            }

            IFormFile imageName = facilityModel.ImageName;

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


            Facility facility = new Facility()
            {
                Id = facilityModel.Id,
                FacilityName = facilityModel.FacilityName,
                Image = image,
                Description = facilityModel.Description,
                Fees = facilityModel.Fees,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,


            };

            _context.Entry(facility).State = EntityState.Modified;

           // _context.Update(facility);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacilityExists(id))
                {
                    return BadRequest(new { Message = "Not Found!" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = "Data has been updated!" }); 
        }

        // POST: api/Facilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Facility>> PostFacility([FromForm] FacilityModel facilityModel)
        {
          if (_context.Facilities == null)
          {
              return Problem("Entity set 'AppDbContext.Facilities'  is null.");
          }

            IFormFile imageName = facilityModel.ImageName;

            if (imageName == null || imageName.Length == 0)
            {
                return BadRequest("Please select an image to upload.");
            }


            List<String> supportedFormats = new List<string> { ".jpg", ".jpeg", ".png", ".gif" };
            if (!supportedFormats.Contains(Path.GetExtension(imageName.FileName.ToLower())))
            {
                return BadRequest("Invalid Image Format. Supported Formats:" + string.Join(",", supportedFormats));
            }
            try
            {
                ImageHelper imagehelper = new ImageHelper();
            var image= await imagehelper.StoreImage(imageName);

            if (imageName == null)
            {
                return BadRequest("Image Storage Failed!");
            }


                Facility facility = new Facility()
                {
                    FacilityName = facilityModel.FacilityName,
                    Image = image,
                    Description = facilityModel.Description,
                    Fees = facilityModel.Fees,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,


                };

           _context.Facilities.Add(facility);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacility", new { id = facility.Id}, facility);

            }
            catch
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        // DELETE: api/Facilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacility(int id)
        {
            if (_context.Facilities == null)
            {
                return NotFound();
            }
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return NotFound();
            }

            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Facilities/Image/6
        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteFacilityImage(int id)
        {
            if (_context.Facilities == null)
            {
                return BadRequest(new { Message = "Not Found Data" });
            }
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return BadRequest(new {Message="Not Found Data"});
            }


            RemoveFile removeFile = new RemoveFile();

            var test =  removeFile.RemoveFileFromFolder(@"D:\CodespexTeam Project\Dharmshala\Dharmshala\dharmshala\src\"+ facility.Image);

            facility.Image = null;
            facility.UpdatedDate=DateTime.Now;

            _context.Facilities.Update(facility);
            await _context.SaveChangesAsync();

            

            return Ok(facility);
        }

        private bool FacilityExists(int id)
        {
            return (_context.Facilities?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
