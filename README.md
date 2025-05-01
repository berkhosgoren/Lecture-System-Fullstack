# LectureSystem – Full Stack Role-Based Lecture Management App

## 🧠 Overview

LectureSystem is a full-stack web application built with Angular (Frontend) and ASP.NET Core Web API (.NET 8) for the backend. It allows Students to submit lecture programs, Supervisors to review them, Lecturers to manage lectures, and Admins to control roles and assignments — all secured with JWT-based authentication and role-based authorization.

---

## ⚙️ Tech Stack

- **Frontend**: Angular 16, PrimeNG, TypeScript
- **Backend**: .NET 8 Web API, Entity Framework Core, SQL Server
- **Auth**: JWT Tokens, Role-based access
- **Database**: Code-first with EF Migrations

---

## 👥 User Roles

- **Student**:
  - View available lectures
  - Submit lecture program
  - Check program approval status

- **Supervisor**:
  - View assigned students
  - Approve or deny student programs

- **Lecturer**:
  - Add, edit, or delete their lectures

- **Admin**:
  - Assign roles (Student, Supervisor, Lecturer)
  - Edit/delete users
  - Assign supervisors to students

---

## 🔐 Features

- JWT login and registration
- Claims-based role routing and access control
- Token interceptor + route guards
- DbInitializer to seed Admin user
- Responsive UI with PrimeNG panels, steppers, and tables

---

## 🚀 How to Run

### Backend (.NET API)
```bash
cd Back-End
dotnet ef database update
dotnet run
```

### 💻 Frontend

```bash
cd ReservationFront
npm install
ng serve
```

---

## 🔐 Default Admin Login
> Seeded via `DbInitializer.cs`

- **Username**: `admin`
- **Password**: `admin123`

---

## ⚠️ Notes
- `appsettings.json` and `appsettings.Development.json` are ignored via `.gitignore`
- CORS is allowed for `http://localhost:4200` in backend (`Program.cs`)
