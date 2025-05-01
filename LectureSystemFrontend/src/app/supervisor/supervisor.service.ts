import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  private apiUrl = 'https://localhost:7287/api/Supervisor';  

  constructor(private http: HttpClient) {}

  
  getProgramsByStudent(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Programs/${studentId}`);
  }

  approveProgram(programId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${programId}/approve`, {});  
  }

  denyProgram(programId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${programId}/deny`, {});  
  }
  getAssignedStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/AssignedStudents`);
  }
}
