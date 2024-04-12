namespace dharmshalaAPI.Model
{
    public class About
    {
        public int Id { get; set; }
        public string? TrustImage { get; set; }
        public string? TrustEmailId { get; set; }
        public string? TrustPhoneNumber { get; set; }
        public string? TrustAddress { get; set; }
        public string? bookingNumber { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
