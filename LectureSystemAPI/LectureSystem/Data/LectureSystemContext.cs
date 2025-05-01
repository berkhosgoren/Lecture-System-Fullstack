using LectureSystem.Entities;
using Microsoft.EntityFrameworkCore;

namespace LectureSystem.Data
{
    public class LectureSystemContext : DbContext
    {
        public LectureSystemContext(DbContextOptions<LectureSystemContext> options) : base(options) { }
        public DbSet<User> Users { get; set; } 
        public DbSet<Lecture> Lectures { get; set; }
        public DbSet<StudentProgram> StudentPrograms { get; set; }
        public DbSet<ProgramLecture> ProgramLectures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<User>().ToTable("Users"); // Treat all users as a flat hierarchy

            // Relationships for Student and Supervisor
            modelBuilder.Entity<Student>()
                .HasOne(s => s.Supervisor) // Each student has one supervisor
                .WithMany(s => s.Students) // A supervisor can have many students
                .HasForeignKey(s => s.SupervisorId) // Foreign key for supervisor
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete to avoid cycles

            // StudentProgram relationships
            modelBuilder.Entity<StudentProgram>()
                .HasOne(sp => sp.Student) // Each student program is associated with one student
                .WithMany(s => s.StudentPrograms) // A student can have multiple programs
                .HasForeignKey(sp => sp.StudentId) // Foreign key for student
                .OnDelete(DeleteBehavior.Cascade); // If a student is deleted, their programs are also deleted

            // Supervisor relationships
            modelBuilder.Entity<StudentProgram>()
                .HasOne(sp => sp.Supervisor) // Each student program may have one supervisor
                .WithMany() // No navigation property in Supervisor for StudentPrograms
                .HasForeignKey(sp => sp.SupervisorId) // Foreign key for supervisor
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete for supervisor

            // Join table between StudentProgram and Lecture
            modelBuilder.Entity<ProgramLecture>()
                .HasKey(pl => new { pl.StudentProgramId, pl.LectureId }); // Composite key for ProgramLecture

            modelBuilder.Entity<ProgramLecture>()
                .HasOne(pl => pl.StudentProgram) // Each ProgramLecture is associated with one StudentProgram
                .WithMany(sp => sp.ProgramLectures) // A StudentProgram can have multiple lectures
                .HasForeignKey(pl => pl.StudentProgramId); // Foreign key for StudentProgram

            modelBuilder.Entity<ProgramLecture>()
                .HasOne(pl => pl.Lecture) // Each ProgramLecture is associated with one Lecture
                .WithMany(l => l.ProgramLectures) // A Lecture can be associated with multiple ProgramLectures
                .HasForeignKey(pl => pl.LectureId); // Foreign key for Lecture

            // Lecturer relationship
            modelBuilder.Entity<Lecture>()
                .HasOne(l => l.Lecturer) // Each lecture is taught by one lecturer
                .WithMany(le => le.Lectures) // A lecturer can teach multiple lectures
                .HasForeignKey(l => l.LecturerId) // Foreign key for Lecturer
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete for lectures
        }
    }
}

