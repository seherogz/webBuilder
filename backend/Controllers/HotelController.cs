using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBuilder.Data;
using WebBuilder.Models;

namespace WebBuilder.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HotelController : ControllerBase
    {
        private readonly WebBuilderContext _context;

        public HotelController(WebBuilderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels()
        {
            var userId = int.Parse(User.Identity.Name);
            return await _context.Hotels
                .Where(h => h.UserId == userId)
                .Include(h => h.Rooms)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            var userId = int.Parse(User.Identity.Name);
            var hotel = await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

            if (hotel == null)
            {
                return NotFound();
            }

            return hotel;
        }

        [HttpPost]
        public async Task<ActionResult<Hotel>> CreateHotel(Hotel hotel)
        {
            var userId = int.Parse(User.Identity.Name);
            hotel.UserId = userId;
            hotel.Subdomain = GenerateSubdomain(hotel.Name);

            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHotel), new { id = hotel.Id }, hotel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotel(int id, Hotel hotel)
        {
            var userId = int.Parse(User.Identity.Name);
            var existingHotel = await _context.Hotels
                .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

            if (existingHotel == null)
            {
                return NotFound();
            }

            existingHotel.Name = hotel.Name;
            existingHotel.Address = hotel.Address;
            existingHotel.ContactPhone = hotel.ContactPhone;
            existingHotel.ContactEmail = hotel.ContactEmail;
            existingHotel.GoogleMapsLink = hotel.GoogleMapsLink;
            existingHotel.AboutText = hotel.AboutText;
            existingHotel.GalleryImages = hotel.GalleryImages;
            existingHotel.ThemeId = hotel.ThemeId;
            existingHotel.PrimaryColor = hotel.PrimaryColor;
            existingHotel.FontFamily = hotel.FontFamily;
            existingHotel.LogoUrl = hotel.LogoUrl;
            existingHotel.SiteTitle = hotel.SiteTitle;
            existingHotel.MetaDescription = hotel.MetaDescription;
            existingHotel.SocialMediaLinks = hotel.SocialMediaLinks;
            existingHotel.HasEnglishSupport = hotel.HasEnglishSupport;
            existingHotel.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var userId = int.Parse(User.Identity.Name);
            var hotel = await _context.Hotels
                .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

            if (hotel == null)
            {
                return NotFound();
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private string GenerateSubdomain(string hotelName)
        {
            return hotelName.ToLower()
                .Replace(" ", "-")
                .Replace("'", "")
                .Replace("\"", "")
                .Replace("&", "and");
        }
    }
} 