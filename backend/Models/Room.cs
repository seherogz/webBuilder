using System.ComponentModel.DataAnnotations;

namespace WebBuilder.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        public List<string> Images { get; set; } = new();
        
        public int Capacity { get; set; }
        public List<string> Amenities { get; set; } = new();
        
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
} 