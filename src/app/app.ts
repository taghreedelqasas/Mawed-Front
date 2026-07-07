import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { UserProfileComponent } from './components/features/profile/profile'; // المسار الصحيح تماماً بدون امتدادات
import { LandingPageSec3 } from './components/landing-page-sec3/landing-page-sec3';
import { LandingPageSec4 } from './components/landing-page-sec4/landing-page-sec4';
import{NavbarPatient} from './components/navbar-patient/navbar-patient';
import { MedicalHistory } from './components/medical-history/medical-history';
// import { AdminDashboard}  from './components/admin-dashboard/admin-dashboard';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { PatientsManagementComponent } from './components/features/patients-management/patients-management.component';
import { DoctorsManagementComponent } from './components/features/doctors-management/doctors-management.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, UserProfileComponent,LandingPageSec3,LandingPageSec4,NavbarPatient,MedicalHistory,AdminDashboardComponent,PatientsManagementComponent,DoctorsManagementComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Maw3ed');
}