namespace LectureSystem.Entities
{
    public class User
    {
        // Base user class shared by all roles
        public int Id { get; set; }

        // Used as login ID
        public string Username { get; set; }

        // Hashed password
        public string PasswordHash { get; set; }

        // Role name (e.g., Student, Admin)
        public string Role { get; set; }
    }

    // Inherits from User, linked to Supervisor
    public class Student : User
    {
        public int? SupervisorId { get; set; }
        public Supervisor Supervisor { get; set; }

        // Programs submitted by the student
        public ICollection<StudentProgram> StudentPrograms { get; set; }
    }

    // Supervisors have many assigned students
    public class Supervisor : User
    {
        public ICollection<Student> Students { get; set; }
    }

    // Lecturers own multiple lectures
    public class Lecturer : User
    {
        public ICollection<Lecture> Lectures { get; set; }
    }

    // Individual lectures, linked to Lecturer
    public class Lecture
    {
        public int Id { get; set; }
        public string LectureName { get; set; }
        public DateTime StartTime { get; set; }
        public string Days { get; set; } 
        public int LecturerId { get; set; } // Foreign key to Lecturer
        public Lecturer Lecturer { get; set; } // Navigation for Lecturer
        public int? MaxEnrollment { get; set; }

        // Which programs contain this lecture
        public ICollection<ProgramLecture> ProgramLectures { get; set; } 
    }


    // One student program submission (e.g., student chooses a set of lectures)
    public class StudentProgram
    {
        public int Id { get; set; }
        public int StudentId { get; set; } // Foreign key to Student
        public Student Student { get; set; } // Navigation for Student
        public int? SupervisorId { get; set; } // Foreign key to Supervisor
        public Supervisor Supervisor { get; set; } // Navigation for Supervisor
        public string Status { get; set; } // Pending, Approved, Denied
        public DateTime SubmissionDate { get; set; } // Date the program was submitted
        public DateTime? ApprovalDate { get; set; } // Date the program was approved
        public ICollection<ProgramLecture> ProgramLectures { get; set; } // List of lectures in the program
    }


    // Join table for StudentPrograms <-> Lectures
    public class ProgramLecture
    {
        public int StudentProgramId { get; set; } // Foreign key to StudentProgram
        public StudentProgram StudentProgram { get; set; } // Navigation for StudentProgram
        public int LectureId { get; set; } // Foreign key to Lecture
        public Lecture Lecture { get; set; } // Navigation for Lecture
        public DateTime EnrolledDate { get; set; } 
    }
}

