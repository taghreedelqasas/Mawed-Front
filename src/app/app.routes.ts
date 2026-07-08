// import { Routes } from '@angular/router';

// export const routes: Routes = [];


import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Booking } from './components/booking/booking';
import { Doctors } from './components/doctors/doctors';
import { DoctorProfile } from './components/doctor-profile/doctor-profile';
import { PatientProfile } from './components/patient-profile/patient-profile';
import { ConsultRequest } from './components/consult-request/consult-request';
import { DoctorChat } from './components/doctor-chat/doctor-chat';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'doctors', component: Doctors },
  { path: 'doctor/:id', component: DoctorProfile },
  { path: 'booking', component: Booking },
  { path: 'profile', component: PatientProfile },
  { path: 'consult', component: ConsultRequest },
  { path: 'chat', component: DoctorChat }
];