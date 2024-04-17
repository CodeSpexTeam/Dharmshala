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
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, [FromForm] ProjectModel projectModel)
        {
            if (id != projectModel.Id)
            {
                return BadRequest(new { Message = "Not Found!" });
            }

            IFormFile imageName = projectModel.ImageName;

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

            Project project = new Project()
            {
                Id = projectModel.Id,
                Title = projectModel.Title,
                Image = image,
                Description = projectModel.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject([FromForm] ProjectModel projectModel)
        {
          if (_context.Projects == null)
          {
              return Problem("Entity set 'AppDbContext.Projects'  is null.");
          }



            IFormFile imageName = projectModel.ImageName;

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

            Project project = new Project()
            {
                Title = projectModel.Title,
                Image = image,
                Description = projectModel.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (_context.Projects == null)
            {
                return BadRequest(new { Message = "Not Found!" });
            }
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return BadRequest(new { Message = "Not Found!" });
            }

            RemoveFile removeFile = new RemoveFile();

            var test = removeFile.RemoveFileFromFolder(@"D:\CodespexTeam Project\Dharmshala\Dharmshala\dharmshala\src\" + project.Image);

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Projects/Image/6
        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteProjectImage(int id)
        {
            if (_context.Projects == null)
            {
                return BadRequest(new { Message = "Not Found Data" });
            }
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return BadRequest(new { Message = "Not Found Data" });
            }

            RemoveFile removeFile = new RemoveFile();

            var test = removeFile.RemoveFileFromFolder(@"D:\CodespexTeam Project\Dharmshala\Dharmshala\dharmshala\src\" + project.Image);

            project.Image = null;
            project.UpdatedDate = DateTime.Now;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }


        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
