import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7287/api/StudentPrograms';  

  constructor(private http: HttpClient) {}

  submitProgram(lectureIds: number[], studentId: number): Observable<any> {
    const program = {
      studentId: studentId,  
      lectureIds: lectureIds
    };
    return this.http.post(`${this.apiUrl}/submit`, program);
  }
  checkProgramStatus(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${studentId}`);
  }
}
