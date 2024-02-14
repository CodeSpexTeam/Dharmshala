using dharmshalaAPI.Model;
using Microsoft.EntityFrameworkCore;
namespace dharmshalaAPI.Data

{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Members> Members { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Gallery> Gallery { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<SocialMedia> SocialMedia { get; set; }
        
    }
}
