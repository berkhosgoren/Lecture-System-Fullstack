import { Component, OnInit } from '@angular/core';
import { LectureService } from '../student/lecture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-lecture',
  templateUrl: './lecturer-delete-lecture.component.html',
  styleUrls: ['./lecturer-delete-lecture.component.css']
})
export class LecturerDeleteLectureComponent implements OnInit {
  lectureId: number | null = null;

  constructor(private lectureService: LectureService, private router: Router) {}

  ngOnInit(): void {
    this.checkRole('Lecturer');
  }

  checkRole(expectedRole: string): void {
    const role = localStorage.getItem('role');
    if (role !== expectedRole) {
      this.router.navigate(['/auth']);
    }
  }

  deleteLecture() {
    if (this.lectureId) {
      this.lectureService.deleteLecture(this.lectureId).subscribe({
        next: () => {
          alert('Lecture deleted successfully');
          this.router.navigate(['/lecturer']);
        },
        error: (error) => {
          console.error('Error deleting lecture', error);
          alert('Failed to delete lecture. Please try again.');
        }
      });
    }
  }
}
