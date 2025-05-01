using LectureSystem.Data;
using LectureSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static LectureSystem.DTOs.LectureSystemDTO;

namespace LectureSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Student")]
    public class StudentProgramsController : ControllerBase
    {
        private readonly LectureSystemContext _context;

        public StudentProgramsController(LectureSystemContext context)
        {
            _context = context;
        }

        // Student submits a lecture program for approval
        [HttpPost("Submit")]
        public async Task<IActionResult> SubmitProgram(StudentProgramDto request)
        {
            var studentId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (studentId == null) return Unauthorized("Not authorized.");

            var student = await _context.Users.OfType<Student>()
                .FirstOrDefaultAsync(s => s.Id == int.Parse(studentId));
            if (student == null) return NotFound("Student not found.");

            var newProgram = new StudentProgram
            {
                StudentId = student.Id,
                SupervisorId = student.SupervisorId,
                Status = "Pending",
                SubmissionDate = DateTime.UtcNow
            };

            _context.StudentPrograms.Add(newProgram);
            await _context.SaveChangesAsync();

            foreach (var lectureId in request.LectureIds)
            {
                _context.ProgramLectures.Add(new ProgramLecture
                {
                    LectureId = lectureId,
                    StudentProgramId = newProgram.Id,
                    EnrolledDate = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync();
            return Ok("Lecture program submitted successfully.");

        }

        // Returns a list of student's own submitted programs
        [HttpGet("MyPrograms")]
        public async Task<ActionResult<List<StudentProgram>>> GetMyPrograms()
        {
            var studentId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (studentId == null) return Unauthorized();

            var programs = await _context.StudentPrograms
                .Include(sp => sp.ProgramLectures)
                .ThenInclude(pl => pl.Lecture)
                .Where(sp => sp.StudentId == int.Parse(studentId))
                .ToListAsync();

            return Ok(programs);
        }

        // Returns the approval status of a submitted program
        [HttpGet("ProgramStatus/{id}")]
        public async Task<ActionResult<string>> GetProgramStatus(int id)
        {
            var studentId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (studentId == null) return Unauthorized();

            var program = await _context.StudentPrograms
                .FirstOrDefaultAsync(p => p.Id == id && p.StudentId == int.Parse(studentId));

            if (program == null) return NotFound("Program not found.");
            return Ok(program.Status);
        }
    }

        
}
