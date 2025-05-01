import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturer-add-lecture',
  templateUrl: './lecturer-add-lecture.component.html',
  styleUrls: ['./lecturer-add-lecture.component.css']
})
export class LecturerAddLectureComponent implements OnInit {
  lectureName: string = '';
  startTime: Date = new Date(); // Initialize with the current date
  days: string = '';
  maxEnrollment: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.checkRole('Lecturer');
  }

  checkRole(expectedRole: string): void {
    const role = localStorage.getItem('role');
    if (role !== expectedRole) {
      this.router.navigate(['/auth']);
    }
  }

  // Function to handle lecture addition
  addLecture(): void {
    const lectureData = {
      lectureName: this.lectureName,
      startTime: this.startTime,
      days: this.days,
      maxEnrollment: this.maxEnrollment
    };

    this.http.post('https://localhost:7287/api/Lectures/AddLecture', lectureData)
      .subscribe({
        next: (response) => {
          console.log('Lecture added successfully', response);
        },
        error: (error) => {
          console.error('Error adding lecture:', error);
        }
      });
  }
}
