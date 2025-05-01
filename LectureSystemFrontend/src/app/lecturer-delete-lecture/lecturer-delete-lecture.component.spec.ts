import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerDeleteLectureComponent } from './lecturer-delete-lecture.component';

describe('LecturerDeleteLectureComponent', () => {
  let component: LecturerDeleteLectureComponent;
  let fixture: ComponentFixture<LecturerDeleteLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerDeleteLectureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerDeleteLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
