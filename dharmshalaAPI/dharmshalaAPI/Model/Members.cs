using System.ComponentModel.DataAnnotations;

namespace dharmshalaAPI.Model
{
    public class Members
    {
        [Key]
        public int Id { get; set; }
        public string Role { get; set; } = "Member";
        public string Name { get; set; }
        public string? LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string MemberType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

    }
}
