import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  private apiUrl = 'https://localhost:7287/api/Lectures';  

  constructor(private http: HttpClient) {}

  getLectures(): Observable<any> {
    return this.http.get(`${this.apiUrl}`); 
  }
  
  getLecture(lectureId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${lectureId}`); 
  }
  
  addLecture(lecture: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, lecture);
  }
  
  editLecture(lectureId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${lectureId}`, updatedData);
  }
  
  deleteLecture(lectureId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${lectureId}`);
  }
  
}
