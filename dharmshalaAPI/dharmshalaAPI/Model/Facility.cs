using dharmshalaAPI.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace dharmshalaAPI.Model
{
    public class Facility
    {
        public int Id { get; set; }
        public string? FacilityName { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public decimal Fees { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }

    }


}
