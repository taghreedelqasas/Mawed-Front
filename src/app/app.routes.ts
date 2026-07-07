import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.AdminDashboardComponent),
  },
  {
    path: 'admin/patients',
    loadComponent: () => import('./components/features/patients-management/patients-management.component').then(m => m.PatientsManagementComponent),
  },
  {
    path: 'admin/doctors',
    loadComponent: () => import('./components/features/doctors-management/doctors-management.component').then(m => m.DoctorsManagementComponent),
  }
];