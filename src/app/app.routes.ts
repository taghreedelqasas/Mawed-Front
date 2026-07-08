import { Routes } from '@angular/router';
import { DoctorDash } from './DoctorDashboard/doctor-dash/doctor-dash';
import { DocMain } from './DoctorDashboard/doc-main/doc-main';
import { DocSlots} from './DoctorDashboard/doc-slots/doc-slots';
import { DocPatients } from './DoctorDashboard/doc-patients/doc-patients';
import { DocConsultations } from './DoctorDashboard/doc-consulations/doc-consulations';
import { DocAnalytics } from './DoctorDashboard/doc-analytics/doc-analytics';
import { DocPayments } from './DoctorDashboard/doc-payments/doc-payments';
import { DocProfile } from './DoctorDashboard/doc-profile/doc-profile';
import { DocSettings } from './DoctorDashboard/doc-settings/doc-settings';
// استوردي باقي المكونات هنا (المواعيد والمرضى)

export const routes: Routes = [
    { path: '', redirectTo: 'doctor-dashboard', pathMatch: 'full' },
  { 
    path: 'doctor-dashboard', 
    component: DoctorDash,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' }, // لو فتح داشبورد الطبيب يحوله علطول للرئيسية
      { path: 'docSlots', component: DocSlots},
      { path: 'main', component: DocMain },
      { path: 'patients', component: DocPatients },
      { path: 'consultations', component:DocConsultations}  ,// إضافة مسار الاستشارات,
      { path: 'analytics', component:DocAnalytics}  ,//   ,
      { path: 'finance', component:DocPayments}  , //   ,
      { path: 'profile', component:DocProfile}  , //   ,
      { path: 'settings', component:DocSettings}  , //   ,

      
    ]
  }
];