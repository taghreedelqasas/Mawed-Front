import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service'; // ✅ تأكدي من المسار

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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.apiError = '';

    const { email, password } = this.loginForm.value;

    // ✅ استدعاء الـ API الحقيقي
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('✅ تم تسجيل الدخول بنجاح');
        
       
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        
       
        if (response.userName) {
          localStorage.setItem('user', JSON.stringify(response.userName));
        }
        
        
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ خطأ في تسجيل الدخول:', err);
        
        // ✅ عرض رسالة الخطأ من الـ API
        this.apiError = err.error?.message || 'بيانات الدخول غير صحيحة. حاول مرة أخرى.';
      }
    });
  }
}