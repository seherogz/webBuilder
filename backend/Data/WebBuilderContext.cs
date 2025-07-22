using Microsoft.EntityFrameworkCore;
using WebBuilder.Models;

namespace WebBuilder.Data
{
    public class WebBuilderContext : DbContext
    {
        public WebBuilderContext(DbContextOptions<WebBuilderContext> options)
            : base(options)
        {
        }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Theme> Themes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hotel>()
                .HasOne(h => h.User)
                .WithMany(u => u.Hotels)
                .HasForeignKey(h => h.UserId);

            modelBuilder.Entity<Room>()
                .HasOne(r => r.Hotel)
                .WithMany(h => h.Rooms)
                .HasForeignKey(r => r.HotelId);
        }
    }
} 