using LectureSystem.Data;
using LectureSystem.Entities;

namespace LectureSystem
{
    public class DbInitializer
    {
        public static async Task Initialize(LectureSystemContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return; 
            }

            // Create an admin user
            var admin = new User
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"), // short password for tests
                Role = "Admin"
            };

            context.Users.Add(admin);
            await context.SaveChangesAsync();
        }
    }
}
