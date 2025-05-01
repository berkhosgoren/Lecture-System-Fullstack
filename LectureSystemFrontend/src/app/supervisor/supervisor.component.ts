import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupervisorService } from './supervisor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
  providers: [MessageService]
})
export class SupervisorComponent implements OnInit {
  assignedStudents: any[] = [];
  studentPrograms: any[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private supervisorService: SupervisorService,
    private messageService: MessageService
  ) {}
  
  
  ngOnInit(): void {
    this.checkRole('Supervisor');
  }

  checkRole(expectedRole: string): void {
    const role = localStorage.getItem('role');
    if (role !== expectedRole) {
      this.router.navigate(['/auth']);
    }
  }
  // Logs out the user
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  // Loads assigned students from the API (uses JWT supervisor ID internally)
  listAssignedStudents(): void {
    this.isLoading = true;
    this.supervisorService.getAssignedStudents().subscribe({
      next: (students) => {
        this.assignedStudents = students;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching assigned students', error);
        this.isLoading = false;
      }
    });
  }

  // Loads student programs by selected student
  getStudentPrograms(studentId: number): void {
    this.supervisorService.getProgramsByStudent(studentId).subscribe({
      next: (programs: any[]) => {
        this.studentPrograms = programs.map(p => ({ ...p, showDetails: false }));
      },
      error: (error: any) => {
        console.error('Error fetching student programs', error);
      }
    });
  }
  

  // Approves a student program
  approveProgram(programId: number): void {
    this.supervisorService.approveProgram(programId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Program approved.' });
        // Refresh program list
        const studentId = this.studentPrograms[0]?.student?.id;
        if (studentId) this.getStudentPrograms(studentId);
      },
      error: (error) => {
        console.error('Approval failed', error);
      }
    });
  }

  // Denies a student program
  denyProgram(programId: number): void {
    this.supervisorService.denyProgram(programId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'warn', summary: 'Denied', detail: 'Program denied.' });
        const studentId = this.studentPrograms[0]?.student?.id;
        if (studentId) this.getStudentPrograms(studentId);
      },
      error: (error) => {
        console.error('Denial failed', error);
      }
    });
  }
}
