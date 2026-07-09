import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

import {
  LoginPayload,
  RegisterPayload,
  AuthResponse
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

 getAccessToken(): string | null {
  if (!this.isBrowser) return null;
  return localStorage.getItem('token');
}

setAccessToken(token: string): void {
  if (!this.isBrowser) return;
  localStorage.setItem('token', token);
}

  login(data: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/auth/login`, data)
      .pipe(
        tap((res: AuthResponse) => {
          console.log('Login Response:', res);

          this.setAccessToken(res.token);

          console.log(
            'Stored Token:',
            localStorage.getItem('access_token')
          );
        })
      );
  }

  register(data: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/auth/register`, data)
      .pipe(
        tap((res: AuthResponse) => {
          this.setAccessToken(res.token);
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();

    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return Date.now() < decoded.exp * 1000;
    } catch {
      return false;
    }
  }

  getUserRoles(): string[] {
    const token = this.getAccessToken();

    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles || decoded.role || [];
    } catch {
      return [];
    }
  }

  getCurrentUser(): any {
    const token = this.getAccessToken();

    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
}