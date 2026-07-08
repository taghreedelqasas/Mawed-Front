import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  apiError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  private redirectBasedOnRoles(roles: string[]): void {
  if (roles.includes('Admin'))
      this.router.navigate(['/admin/dashboard']);
  else if (roles.includes('Doctor'))
      this.router.navigate(['/doctor/dashboard']);
  else if (roles.includes('Patient'))
     this.router.navigate(['/patient/dashboard']);
  else  
     this.router.navigate(['/auth/login']);
}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.apiError = '';

    const { email, password } = this.loginForm.value;

 this.authService.login({ email, password }).subscribe({
    next: (res) => {
      this.isLoading = false;
      this.redirectBasedOnRoles(res.roles);
      console.log('login success')
    },
      error: (err) => {
       this.isLoading = false;
  
       this.apiError = err?.error?.[0] ?? 'something went wrong , try again';
      }
    });
  }
}