import { Routes } from '@angular/router';
// مسارات المريض والصفحات العامة (فرع sama)
import { Home } from './components/home/home';
import { Booking } from './components/booking/booking';
import { Doctors } from './components/doctors/doctors';
import { DoctorProfile } from './components/doctor-profile/doctor-profile';
import { PatientProfile } from './components/patient-profile/patient-profile';
import { ConsultRequest } from './components/consult-request/consult-request';
import { DoctorChat } from './components/doctor-chat/doctor-chat';

// مسارات لوحة تحكم الطبيب (فرع develop)
import { DoctorDash } from './DoctorDashboard/doctor-dash/doctor-dash';
import { DocMain } from './DoctorDashboard/doc-main/doc-main';
import { DocSlots from './DoctorDashboard/doc-slots/doc-slots';
import { DocPatients } from './DoctorDashboard/doc-patients/doc-patients';
import { DocConsultations } from './DoctorDashboard/doc-consulations/doc-consulations';
import { DocAnalytics } from './DoctorDashboard/doc-analytics/doc-analytics';
import { DocPayments } from './DoctorDashboard/doc-payments/doc-payments';
import { DocProfile } from './DoctorDashboard/doc-profile/doc-profile';
import { DocSettings } from './DoctorDashboard/doc-settings/doc-settings';

export const routes: Routes = [
  // مسارات المريض والصفحات العامة
  { path: '', component: Home },
  { path: 'doctors', component: Doctors },
  { path: 'doctor/:id', component: DoctorProfile },
  { path: 'booking', component: Booking },
  { path: 'profile', component: PatientProfile },
  { path: 'consult', component: ConsultRequest },
  { path: 'chat', component: DoctorChat },

  // مسار لوحة تحكم الطبيب بمساراتها الفرعية
  { 
    path: 'doctor-dashboard', 
    component: DoctorDash,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' }, 
      { path: 'main', component: DocMain },
      { path: 'docSlots', component: DocSlots },
      { path: 'patients', component: DocPatients },
      { path: 'consultations', component: DocConsultations },
      { path: 'analytics', component: DocAnalytics },
      { path: 'finance', component: DocPayments },
      { path: 'profile', component: DocProfile },
      { path: 'settings', component: DocSettings }
    ]
  }
];
