import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7287/api/Admin';  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  getSupervisors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/supervisors`);
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students`);
  }
  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }

  editUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${userId}`, updatedUser);
  }

  assignRole(userId: number, roleData: any) {
    return this.http.put(`${this.apiUrl}/assignRole/${userId}`, roleData);
  }

  assignStudentsToSupervisor(supervisorId: number, studentIds: number[]): Observable<any> {
    const payload = {
      supervisorId: supervisorId,
      studentIds: studentIds
    };
    return this.http.put(`${this.apiUrl}/AssignSupervisor`, payload); 
  }
}
