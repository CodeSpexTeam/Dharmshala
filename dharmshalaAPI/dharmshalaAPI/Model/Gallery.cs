using System.ComponentModel.DataAnnotations.Schema;

namespace dharmshalaAPI.Model
{
    public class Gallery
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string? Title { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
