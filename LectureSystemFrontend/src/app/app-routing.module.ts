import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { StudentComponent } from './student/student.component';
import { RoleGuard } from './role.guard';
import { LecturerComponent } from './lecturer/lecturer.component';
import { LecturerAddLectureComponent } from './lecturer-add-lecture/lecturer-add-lecture.component';
import { LecturerDeleteLectureComponent } from './lecturer-delete-lecture/lecturer-delete-lecture.component';  
import { LecturerEditLectureComponent } from './lecturer-edit-lecture/lecturer-edit-lecture.component'; 
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'student', component: StudentComponent, canActivate: [RoleGuard], data: { role: 'Student' } },
  { path: 'lecturer', component: LecturerComponent },
  { path: 'lecturer/add-lecture', component: LecturerAddLectureComponent },
  { path: 'lecturer/delete-lecture', component: LecturerDeleteLectureComponent },  
  { path: 'lecturer/edit-lecture', component: LecturerEditLectureComponent },  
  { path: 'supervisor', component: SupervisorComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
