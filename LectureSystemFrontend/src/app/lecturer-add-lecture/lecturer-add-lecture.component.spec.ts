import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerAddLectureComponent } from './lecturer-add-lecture.component';

describe('LecturerAddLectureComponent', () => {
  let component: LecturerAddLectureComponent;
  let fixture: ComponentFixture<LecturerAddLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerAddLectureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerAddLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
