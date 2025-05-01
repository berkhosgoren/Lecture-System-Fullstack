import { Component, OnInit } from '@angular/core';
import { LectureService } from '../student/lecture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-lecture',
  templateUrl: './lecturer-edit-lecture.component.html',
  styleUrls: ['./lecturer-edit-lecture.component.css']
})
export class LecturerEditLectureComponent implements OnInit {
  lectureId: number | null = null;
  lectureData: any = {
    lectureName: '',
    startTime: new Date(),
    days: '',
    maxEnrollment: null
  };

  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkRole('Lecturer');
    this.lectureId = Number(this.route.snapshot.paramMap.get('id'));  // Get the lecture ID from the URL

    if (this.lectureId) {
      this.lectureService.getLecture(this.lectureId).subscribe({
        next: (lecture) => {
          this.lectureData = lecture;  // Load the lecture data into the form
        },
        error: (error) => {
          console.error('Error loading lecture', error);
        }
      });
    }
  }

  checkRole(expectedRole: string): void {
    const role = localStorage.getItem('role');
    if (role !== expectedRole) {
      this.router.navigate(['/auth']);
    }
  }

  updateLecture() {
    if (this.lectureId) {
      this.lectureService.editLecture(this.lectureId, this.lectureData).subscribe({
        next: () => {
          alert('Lecture updated successfully');
          this.router.navigate(['/lecturer']);  // Navigate back to lecturer panel after successful update
        },
        error: (error) => {
          console.error('Error updating lecture', error);
          alert('Failed to update lecture. Please try again.');
        }
      });
    }
  }
}
