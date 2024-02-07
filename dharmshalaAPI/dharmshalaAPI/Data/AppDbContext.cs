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




    }
}
