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
    public class LecturesController : ControllerBase
    {
        private readonly LectureSystemContext _context;

        public LecturesController(LectureSystemContext context)
        {
            _context = context;
        }

        // Creates a lecture and links it to the currently logged-in lecturer
        [HttpPost("Create")]
        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> CreateLecture(LectureDto request)
        {

            var lecturerId = User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (lecturerId == null)
            {
                return Unauthorized("User is not authorized.");
            }

            var lecturer = await _context.Users.OfType<Lecturer>()
                .FirstOrDefaultAsync(u => u.Id == int.Parse(lecturerId));

            if (lecturer == null)
            {
                return NotFound("Lecturer not found.");
            }
            // Debug for validation
            Console.WriteLine($"Lecture Name: {request.LectureName}, Start Time: {request.StartTime}, Days: {request.Days}");

            var lecture = new Lecture
            {
                LectureName = request.LectureName,
                StartTime = request.StartTime,
                Days = request.Days,
                MaxEnrollment = request.MaxEnrollment,
                LecturerId = lecturer.Id
            };

            _context.Lectures.Add(lecture);
            await _context.SaveChangesAsync();

            return Ok(lecture);
        }


        // Lists all lectures (accessible to all authenticated users)
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetLectures()
        {
            var lectures = await _context.Lectures.ToListAsync();
            return Ok(lectures);
        }


        // Fetches a specific lecture by its ID
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLecture(int id)
        {
            var lecture = await _context.Lectures.FindAsync(id);

            if (lecture == null)
            {
                return NotFound();
            }

            return Ok(lecture);
        }

        // Updates a lecture by ID (only for lecturers)
        [HttpPut("{id}")]
        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> UpdateLecture(int id, UpdateLectureDto request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            var lecture = await _context.Lectures.FindAsync(id);
            if (lecture == null)
            {
                return NotFound();
            }

            lecture.LectureName = request.LectureName;
            lecture.StartTime = request.StartTime;
            lecture.Days = request.Days;
            lecture.MaxEnrollment = request.MaxEnrollment;

            _context.Entry(lecture).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(lecture);
        }

        // Deletes a lecture by ID (only for lecturers)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> DeleteLecture(int id)
        {
            var lecture = await _context.Lectures.FindAsync(id);
            if (lecture == null)
            {
                return NotFound();
            }

            _context.Lectures.Remove(lecture);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
