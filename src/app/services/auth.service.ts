import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = signal<boolean>(this.checkInitialAuthStatus());

  constructor() {}

  private checkInitialAuthStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
  }
}
