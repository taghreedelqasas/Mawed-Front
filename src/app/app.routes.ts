import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';

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
  }
];