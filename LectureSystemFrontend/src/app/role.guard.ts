import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // The guard checks if the user's role matches the role required for the route
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];  // Get the role required for this route

    // Here, fetch the role stored after login (it could be in localStorage or somewhere else)
    const userRole = this.authService.getUserRole();  // Fetch role from AuthService or localStorage

    if (userRole === requiredRole) {
      return true;  // Allow access if roles match
    } else {
      // If the user does not have the required role, redirect to the login page or an error page
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
