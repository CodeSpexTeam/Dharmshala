using System.ComponentModel.DataAnnotations.Schema;

namespace dharmshalaAPI.HelperModal
{
    public class FacilityModel
    {
        public int Id { get; set; }
        public string? FacilityName { get; set; }
        public string? Description { get; set; }
        [NotMapped]
        public IFormFile? ImageName { get; set; }
        public string? Image { get; set; }
        public decimal Fees { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
