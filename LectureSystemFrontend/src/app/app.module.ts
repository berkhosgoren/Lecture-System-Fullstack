import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';  
import { InputTextModule } from 'primeng/inputtext';  
import { PasswordModule } from 'primeng/password';
import { StudentComponent } from './student/student.component';  
import { AuthInterceptor } from './auth.interceptor';
import { LecturerComponent } from './lecturer/lecturer.component';
import { LecturerAddLectureComponent } from './lecturer-add-lecture/lecturer-add-lecture.component';
import { LecturerEditLectureComponent } from './lecturer-edit-lecture/lecturer-edit-lecture.component';
import { LecturerDeleteLectureComponent } from './lecturer-delete-lecture/lecturer-delete-lecture.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AdminComponent } from './admin/admin.component';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';  // Import ToastModule
import { MessageService } from 'primeng/api';  // Import MessageService
 

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  declarations: [
    AppComponent,
    AuthComponent,
    StudentComponent,
    LecturerComponent,
    LecturerAddLectureComponent,
    LecturerEditLectureComponent,
    LecturerDeleteLectureComponent,
    SupervisorComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,  
    InputTextModule,  
    PasswordModule,
    TableModule,
    ListboxModule,
    MultiSelectModule,
    DialogModule,
    BrowserAnimationsModule,
    PickListModule,
    DragDropModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
