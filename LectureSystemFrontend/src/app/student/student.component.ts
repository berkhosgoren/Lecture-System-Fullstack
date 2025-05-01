import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { LectureService } from './lecture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  lectures: any[] = [];
  selectedLectures: any[] = []; // Array to hold selected lectures for the program
  submissionStatus: string | null = null;
  isLoading: boolean = false;

  constructor(private studentService: StudentService, private lectureService: LectureService, private router: Router) { }

  ngOnInit(): void {
    const studentId = 1;  // Replace with actual logic to retrieve student ID
    this.checkProgramStatus(studentId);  // Initial status check
    this.checkRole('Student');
  }
  
  checkRole(expectedRole: string): void {
    const role = localStorage.getItem('role');
    if (role !== expectedRole) {
      this.router.navigate(['/auth']);
    }
  }

  // Load available lectures
  loadLectures(): void {
    this.lectureService.getLectures().subscribe({
      next: (response) => {
        this.lectures = response;
      },
      error: (error) => {
        console.error('Error loading lectures', error);
      }
    });
  }

  // Add a lecture to the selected program
  addLectureToProgram(lecture: any): void {
    if (!this.selectedLectures.some(l => l.id === lecture.id)) {
      this.selectedLectures.push(lecture);
    }
  }

  // Remove a lecture from the selected program
  removeLectureFromProgram(lecture: any): void {
    this.selectedLectures = this.selectedLectures.filter(l => l.id !== lecture.id);
  }

  // Submit the selected program
  submitProgram(): void {
    if (this.selectedLectures.length === 0) {
      alert('Please select at least one lecture.');
      return;
    }
  
    const studentId = parseInt(localStorage.getItem('userId') || '0');  // Retrieve student ID dynamically
    this.isLoading = true;
    const lectureIds = this.selectedLectures.map(lecture => lecture.id);
  
    this.studentService.submitProgram(lectureIds, studentId).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Program submitted successfully!');
        this.checkProgramStatus(studentId);  // Check status after submission
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Program submission failed', error);
      }
    });
  }

  // Check the status of the student's program
  checkProgramStatus(studentId: number): void {
    this.studentService.checkProgramStatus(studentId).subscribe({
      next: (response) => {
        this.submissionStatus = response.status;
      },
      error: (error) => {
        console.error('Error fetching submission status', error);
      }
    });
  }

  // Handle logout
  logout(): void {
    this.router.navigate(['/auth']);
  }
}
