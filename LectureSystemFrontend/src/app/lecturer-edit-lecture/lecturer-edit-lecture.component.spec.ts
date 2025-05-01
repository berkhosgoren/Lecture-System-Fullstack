import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerEditLectureComponent } from './lecturer-edit-lecture.component';

describe('LecturerEditLectureComponent', () => {
  let component: LecturerEditLectureComponent;
  let fixture: ComponentFixture<LecturerEditLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerEditLectureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerEditLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
