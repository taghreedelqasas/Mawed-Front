import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { ConfirmEmailSuccessComponent } from './features/auth/confirm-email-success/confirm-email-success.component';
import { DoctorInfoComponent } from './features/auth/doctor-info/doctor-info.component';
export const routes: Routes = [
  {path: 'auth/login',
  component: LoginComponent},
  {
    path: '',
    redirectTo: 'auth/register',
    pathMatch: 'full'
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'auth/confirm-email-notice',
    loadComponent: () =>
      import('./features/auth/confirm-email-notice/confirm-email-notice.component')
        .then(m => m.ConfirmEmailNoticeComponent)
  },
   
   { path: 'confirm-email-success', component: ConfirmEmailSuccessComponent },
   {
    path: 'api/auth/confirm-email',
    component: ConfirmEmailSuccessComponent
  },
    
  {
    path: 'auth/forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },
  { path: 'auth/reset-password', 
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent)
  },
   {
    path: 'api/auth/reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'auth/doctor-info',
    loadComponent: () =>
      import('./features/auth/doctor-info/doctor-info.component')
        .then(m => m.DoctorInfoComponent)
  }
 
];