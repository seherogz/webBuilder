using System.ComponentModel.DataAnnotations;

namespace WebBuilder.Models
{
    public class Hotel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [Phone]
        public string ContactPhone { get; set; }

        [Required]
        [EmailAddress]
        public string ContactEmail { get; set; }

        public string GoogleMapsLink { get; set; }
        public string AboutText { get; set; }
        public List<string> GalleryImages { get; set; } = new();
        
        [Required]
        public string ThemeId { get; set; }
        public Theme Theme { get; set; }
        
        public string PrimaryColor { get; set; }
        public string FontFamily { get; set; }
        public string LogoUrl { get; set; }
        
        [Required]
        public string SiteTitle { get; set; }
        public string MetaDescription { get; set; }
        public Dictionary<string, string> SocialMediaLinks { get; set; }
        public bool HasEnglishSupport { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
        
        public List<Room> Rooms { get; set; } = new();
        
        public string Subdomain { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
} 