namespace dharmshalaAPI.Model
{
    public class Feedback
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? phone { get; set; }
        public int TotalMember { get; set; }
        public string? Email { get; set; }
        public string? RoomType { get; set; }
        public string? Comment { get; set; }
        public DateTime Date { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}

