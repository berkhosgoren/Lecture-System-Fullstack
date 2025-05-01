import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturer-panel',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role !== 'Lecturer') {
      this.router.navigate(['/auth']);
    }
  }
  
  addLecture() {
    this.router.navigate(['/lecturer/add-lecture']);
  }

  editLecture() {
    this.router.navigate(['/lecturer/edit-lecture']);
  }

  deleteLecture() {
    this.router.navigate(['/lecturer/delete-lecture']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
