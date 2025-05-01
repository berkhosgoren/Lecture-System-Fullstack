using LectureSystem.Data;
using LectureSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static LectureSystem.DTOs.LectureSystemDTO;


namespace LectureSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly LectureSystemContext _context;

        public AdminController(LectureSystemContext context)
        {
            _context = context;
        }

        // Returns all users in the system regardless of role
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // Returns all supervisors in the system
        [HttpGet("supervisors")]
        public async Task<IActionResult> GetSupervisors()
        {
            var supervisors = await _context.Users.OfType<Supervisor>().ToListAsync();
            return Ok(supervisors);
        }

        // Returns all students in the system
        [HttpGet("students")]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _context.Users.OfType<Student>().ToListAsync();
            return Ok(students);
        }


        // Reassigns a user to a new role by deleting and replacing the entity
        [HttpPut("AssignRole/{userId}")]
        public async Task<IActionResult> AssignRole(int userId, AssignRoleWithIdDto request)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Build role-specific subclass
            if (request.Role == "Student")
            {
                var student = new Student
                {
                    Id = user.Id,
                    Username = user.Username,
                    PasswordHash = user.PasswordHash,
                    Role = request.Role,
                    SupervisorId = null 
                };

                _context.Entry(user).State = EntityState.Deleted; 
                _context.Users.Add(student); 
            }
            else if (request.Role == "Supervisor")
            {
                var supervisor = new Supervisor
                {
                    Id = user.Id,
                    Username = user.Username,
                    PasswordHash = user.PasswordHash,
                    Role = request.Role
                };
                _context.Entry(user).State = EntityState.Deleted; 
                _context.Users.Add(supervisor); 
            }
            else if (request.Role == "Lecturer")
            {
                var lecturer = new Lecturer
                {
                    Id = user.Id,
                    Username = user.Username,
                    PasswordHash = user.PasswordHash,
                    Role = request.Role
                };
                _context.Entry(user).State = EntityState.Deleted; 
                _context.Users.Add(lecturer); 
            }
            else
            {
                return BadRequest("Invalid role assignment.");
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = $"Role assigned successfully as {request.Role}." });
        }



        // Assigns one supervisor to multiple students
        [HttpPut("AssignSupervisor")]
        public async Task<IActionResult> AssignSupervisorToStudent([FromBody] AssignStudentsDto dto)
        {
            var supervisor = await _context.Users.OfType<Supervisor>().FirstOrDefaultAsync(s => s.Id == dto.SupervisorId);

            if (supervisor == null)
            {
                return NotFound("Supervisor not found.");
            }

            foreach (var studentId in dto.StudentIds)
            {
                var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Id == studentId);
                if (student != null)
                {
                    student.SupervisorId = supervisor.Id;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Students assigned successfully to the supervisor." });
        }



        // Edits a user's username and/or password
        [HttpPut("edit/{userId}")]
        public async Task<IActionResult> EditUser(int userId, EditUserDto request)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (!string.IsNullOrEmpty(request.Username))
            {
                user.Username = request.Username;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully." });
        }

        // Deletes a user by ID
        [HttpDelete("Delete/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }

}
