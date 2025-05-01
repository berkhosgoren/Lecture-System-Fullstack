import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface Student {
  id: number;
  username: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService]
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  supervisors: any[] = [];
  students: any[] = [];

  selectedUserId: number | null = null;
  editUsername = '';
  editPassword = '';

  editRole = '';
  assignRoleSelectedUserId: number | null = null;

  showAssignModal = false;
  selectedSupervisor: any = null;
  selectedStudents: any[] = [];
  studentsTransfer: { source: Student[]; target: Student[] } = { source: [], target: [] };

  showUserList = false;

  constructor(private adminService: AdminService, private router: Router,  private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadSupervisorsAndStudents();
    this.checkRole('Admin')
  }

  checkRole(expectedRole: string): void {
    const role = localStorage.getItem('role');
    if (role !== expectedRole) {
      this.router.navigate(['/auth']);
    }
  }

  toggleUserList(): void {
    this.showUserList = !this.showUserList;
  }
  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error loading users', error);
      }
    });
  }

  loadSupervisorsAndStudents(): void {
    this.loadSupervisors();
    this.loadStudents();
  }
  loadSupervisors(): void {
    this.adminService.getSupervisors().subscribe({
      next: (response) => {
        this.supervisors = response;
        console.log('Supervisors loaded:', this.supervisors);
      },
      error: (error) => {
        console.error('Error loading supervisors', error);
      }
    });
  }
  loadStudents(): void {
    this.adminService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.studentsTransfer.source = students; 
        console.log('Loaded students:', this.studentsTransfer.source);
      },
      error: (error) => {
        console.error('Error loading students', error);
      }
    });
  }
  onEdit(user: any): void {
    this.editUsername = user.username;
    this.editPassword = ''; 
    this.selectedUserId = user.id;
  }
  onSaveChanges(): void {
    if (!this.editUsername) {
      alert('Username is required!');
      return;
    }
    if (this.selectedUserId === null) {
      alert('No user selected for editing');
      return;
    }
    const updatedUser = { username: this.editUsername, password: this.editPassword };
    this.adminService.editUser(this.selectedUserId, updatedUser).subscribe({
      next: () => {
        this.loadUsers();
        this.clearEditFields();
      },
      error: (error) => {
        console.error('Error saving changes', error);
      }
    });
  }
  onAssignRole(user: any): void {
    this.assignRoleSelectedUserId = user.id;  
    this.editRole = user.role;  
  }
  
  onSaveAssignedRole(): void {
    const validRoles = ['Student', 'Supervisor', 'Lecturer', 'Admin'];
    if (!validRoles.includes(this.editRole)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Invalid role selected.'});
      return;
    }
  
    if (this.assignRoleSelectedUserId === null) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No user selected for role assignment!'});
      return;
    }
  
    const updatedRole = { role: this.editRole, assignedId: this.assignRoleSelectedUserId };
    this.adminService.assignRole(this.assignRoleSelectedUserId, updatedRole).subscribe({
      next: () => {
        this.loadUsers();
        this.clearAssignRoleFields();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Role assigned successfully!'});
      },
      error: (error) => {
        console.error('Error assigning role', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Role assignment failed!'});
      }
    });
  }
  openAssignModal(): void {
    this.showAssignModal = true;
  }
  closeAssignModal(): void {
    this.showAssignModal = false;
    this.selectedSupervisor = null;
    this.selectedStudents = [];
  }
  assignStudentsToSupervisor(): void {
    if (!this.selectedSupervisor || this.studentsTransfer.target.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a supervisor and at least one student.' });
      return;
    }
    const studentIds: number[] = this.studentsTransfer.target.map((student) => student.id);
    this.adminService.assignStudentsToSupervisor(this.selectedSupervisor.id, studentIds).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Students assigned successfully.' });
        this.clearAssignFields();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error assigning students.' });
        console.error('Error assigning students', error);
      }
    });
  }

  clearAssignFields(): void {
    this.selectedSupervisor = null;
    this.studentsTransfer = { source: [], target: [] };
  }



  onDelete(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
    }
  }

  clearEditFields(): void {
    this.editUsername = '';
    this.editPassword = '';
    this.selectedUserId = null;
  }

  clearAssignRoleFields(): void {
    this.editRole = '';
    this.assignRoleSelectedUserId = null;
  }

  logout(): void {
    this.router.navigate(['/auth']);
  }
}
