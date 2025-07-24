using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBuilder.Data;
using WebBuilder.Models;

namespace WebBuilder.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly WebBuilderContext _context;

        public UsersController(WebBuilderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.CreatedAt
                })
                .ToListAsync();
            return Ok(users);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public class UpdateUserDto
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto update)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            user.Name = update.Name;
            user.Email = update.Email;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(new {
                user.Id,
                user.Name,
                user.Email,
                user.CreatedAt
            });
        }
    }
} 