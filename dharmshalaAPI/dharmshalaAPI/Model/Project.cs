using System.ComponentModel.DataAnnotations.Schema;

namespace dharmshalaAPI.Model
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }   
        public string? Description { get; set; }
        [NotMapped]
        public IFormFile ImageName { get; set; }
        public string? Image { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
