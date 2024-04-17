using System.ComponentModel.DataAnnotations.Schema;

namespace dharmshalaAPI.HelperModal
{
    public class GalleryModel
    {

        public int Id { get; set; }
        [NotMapped]
        public IFormFile ImageName { get; set; }
        public string? Title { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
