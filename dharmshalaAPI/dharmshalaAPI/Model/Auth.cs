namespace dharmshalaAPI.Model
{
    public class Auth
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public int MembersId { get; set; }
        public Members Members { get; set; }
    }
}
