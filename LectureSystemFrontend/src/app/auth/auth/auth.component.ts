import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  username = '';
  password = '';
  confirmPassword = '';
  loginError: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          const token = response.token;
          const role = response.role;
          this.authService.setToken(token, role);

          console.log('Role from response:', response.Role); 

          // Navigate based on the user's role
          if (role === 'Student') {
            this.router.navigate(['/student']);
          } else if (role === 'Lecturer') {
            this.router.navigate(['/lecturer']);
          } else if (role === 'Supervisor') {
            this.router.navigate(['/supervisor']);
          } else if (role === 'Admin') {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.loginError = 'Invalid username or password';
        }
      });
    } else {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }


      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.toggleMode();  
        },
        error: (error) => console.error('Registration failed', error)
      });
    }
  }

  toggleMode(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isLoginMode = !this.isLoginMode;
  }
}
