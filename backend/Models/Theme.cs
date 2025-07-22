using System.ComponentModel.DataAnnotations;

namespace WebBuilder.Models
{
    public class Theme
    {
        public string Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string PreviewImageUrl { get; set; }
        
        [Required]
        public string TemplateJson { get; set; }
        
        public List<string> AvailableFonts { get; set; } = new();
        public List<string> DefaultColors { get; set; } = new();
        
        public List<Hotel> Hotels { get; set; } = new();
    }
} 