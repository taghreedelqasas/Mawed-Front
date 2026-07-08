import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../services/appointment';

@Component({
  selector: 'app-doc-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doc-profile.html',
  styleUrl: './doc-profile.css'
})
export class DocProfile implements OnInit {
  protected appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    // استدعاء الدوال الحقيقية الموجودة في الـ Service
    this.appointmentService.getUserProfile();
    this.appointmentService.getDoctorById(1); // يمكن تعويض الـ ID بـ ID الطبيب الحالي
    this.appointmentService.getWalletTransactions(); // لجلب المعاملات المالية الحقيقية
  }

  onUpdateProfile(): void {
    const user = this.appointmentService.userProfile();
    const doc = this.appointmentService.doctor();

    if (user && doc) {
      // استدعاء الـ update الحقيقي من الـ Service لكل جزء
      this.appointmentService.updateUserProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber ?? undefined,
        birthDate: user.birthDate ?? undefined,
        gender: user.gender ?? undefined
      }).subscribe(() => {
        this.appointmentService.updateDoctorProfile({
          id: doc.id,
          licenseNumber: doc.licenseNumber,
          consultationFee: doc.consultationFee,
          address: doc.address
        }).subscribe(() => {
          alert('تم تحديث البيانات المهنية والشخصية بنجاح! ✨');
        });
      });
    }
  }

  onUpdateWorkingHours(): void {
    alert('سيتم ربط تعديل أوقات العمل لاحقاً فور توفرها بالـ Backend.');
  }
}