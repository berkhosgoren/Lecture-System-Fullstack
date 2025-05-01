using System.ComponentModel.DataAnnotations;

namespace LectureSystem.DTOs
{
    public class LectureSystemDTO
    {
        // DTO for registering a new user
        public class RegisterDto
        {
            [Required]
            [StringLength(50, MinimumLength = 3)]
            public string Username { get; set; }

            [Required]
            [StringLength(100, MinimumLength = 6)]
            public string Password { get; set; }
        }
        // DTO for logging in a user
        public class LoginDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        // DTO for adding or updating a lecture
        public class LectureDto
        {
            public string LectureName { get; set; }
            public DateTime StartTime { get; set; }
            public string Days { get; set; } 
            public int? MaxEnrollment { get; set; } 
            public int LecturerId { get; set; } 
        }
        // DTO for updating a lecture 
        public class UpdateLectureDto : LectureDto
        {
            public int Id { get; set; }
        }

        // DTO for editing user details
        public class EditUserDto
        {
            public string Username { get; set; }
            public string Password { get; set; } 
        }

        // DTO for submitting a student program
        public class StudentProgramDto
        {
            public int StudentId { get; set; }
            public List<int> LectureIds { get; set; } 
        }

        // DTO for assigning a role and optionally supervisor
        public class AssignRoleWithIdDto
        {
            public string Role { get; set; } 
            public int? SupervisorId { get; set; }
        }
        public class AssignStudentsDto
        {
            public int SupervisorId { get; set; }
            public List<int> StudentIds { get; set; }
        }
    }
    }


