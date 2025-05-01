using LectureSystem.Data;
using LectureSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LectureSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Supervisor")]
    public class SupervisorController : ControllerBase
    {
        private readonly LectureSystemContext _context;

        public SupervisorController(LectureSystemContext context)
        {
            _context = context;
        }

        // Returns all students assigned to the currently logged-in supervisor
        [HttpGet("AssignedStudents")]
        public async Task<IActionResult> GetAssignedStudents()
        {
            var supervisorId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (supervisorId == null) return Unauthorized();

            var students = await _context.Users.OfType<Student>()
                .Include(s => s.StudentPrograms)
                .Where(s => s.SupervisorId == int.Parse(supervisorId))
                .Select(s => new
                {
                    s.Id,
                    s.Username,
                    s.StudentPrograms
                })
                .ToListAsync();

            return Ok(students);
        }

        // Approves a student’s program by ID
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveProgram(int id)
        {
            var program = await _context.StudentPrograms.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }

            program.Status = "Approved";
            program.ApprovalDate = DateTime.UtcNow;

            _context.Entry(program).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Denies a student’s program by ID
        [HttpPut("{id}/deny")]
        public async Task<IActionResult> DenyProgram(int id)
        {
            var program = await _context.StudentPrograms.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }

            program.Status = "Denied";
            program.ApprovalDate = DateTime.UtcNow;

            _context.Entry(program).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Returns all programs submitted by a specific student
        [HttpGet("Programs/{studentId}")] 
        public async Task<IActionResult> GetPrograms(int studentId)
        {
            
            var programs = await _context.StudentPrograms
                .Include(sp => sp.Student)
                .Include(sp => sp.ProgramLectures)
                .Where(sp => sp.StudentId == studentId) 
                .ToListAsync();

            if (programs == null || !programs.Any())
            {
                return NotFound($"No programs found for student with ID {studentId}.");
            }

            return Ok(programs); 
        }

    }
}

