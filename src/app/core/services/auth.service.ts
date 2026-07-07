import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginPayload, RegisterPayload } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly base = 'https://localhost:7150/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register`, payload);
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, payload).pipe(
      tap(res => {
        if (res.isAuthenticated) {
          localStorage.setItem('token',     res.token);
          localStorage.setItem('userEmail', res.email);
          localStorage.setItem('userRoles', JSON.stringify(res.roles));
          localStorage.setItem('userId',    res.userId);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.base}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRoles');
        localStorage.removeItem('userId');
      })
    );
  }

  forgotPassword(email: string, clientBaseUrl: string): Observable<any> {
    return this.http.post(`${this.base}/forgot-password`, { email, clientBaseUrl });
  }

  resetPassword(userId: string, token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.base}/reset-password`, { userId, token, newPassword, confirmPassword });
  }

  getToken(): string | null        { return localStorage.getItem('token'); }
  isLoggedIn(): boolean            { return !!this.getToken(); }
  getUserRoles(): string[]         { const r = localStorage.getItem('userRoles'); return r ? JSON.parse(r) : []; }
  isAdmin(): boolean               { return this.getUserRoles().includes('Admin');   }
  isDoctor(): boolean              { return this.getUserRoles().includes('Doctor');  }
  isPatient(): boolean             { return this.getUserRoles().includes('Patient'); }
}