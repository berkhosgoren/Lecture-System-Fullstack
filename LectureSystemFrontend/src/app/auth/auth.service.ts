import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7287/api/Auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
  // Method to set both the token and the role
  setToken(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);  
  }
  // Method to get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Method to get the user's role
  getUserRole(): string | null {
    return localStorage.getItem('role');  
  }
  // Method to clear auth data on logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }
}
