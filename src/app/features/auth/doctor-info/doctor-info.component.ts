import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-doctor-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  doctorForm!: FormGroup;
  isLoading = false;
  apiError  = '';

  idCardFile:      File | null = null;
  licenseFile:     File | null = null;
  certificateFile: File | null = null;
  idCardName      = '';
  licenseName     = '';
  certificateName = '';

  specializations = [
    'طب عام', 'أسنان', 'عيون', 'قلب وأوعية دموية',
    'أطفال', 'نساء وتوليد', 'عظام', 'جلدية',
    'أنف وأذن وحنجرة', 'مسالك بولية', 'باطنة', 'أعصاب'
  ];

  constructor(
    private fb:          FormBuilder,
    private router:      Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // لو مفيش بيانات أساسية → ارجع للـ register
    const saved = localStorage.getItem('doctorBasicData');
    if (!saved) {
      this.router.navigate(['/auth/register']);
      return;
    }

    this.doctorForm = this.fb.group({
      specialization:  ['', Validators.required],
      yearsExperience: ['', [Validators.required, Validators.min(0), Validators.max(60)]],
      clinicAddress:   ['', Validators.required],
      idCard:          [false, Validators.requiredTrue],
      license:         [false, Validators.requiredTrue],
      certificate:     [false, Validators.requiredTrue]
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.doctorForm.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  onFileChange(event: Event, type: 'idCard' | 'license' | 'certificate'): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;

    if (type === 'idCard') {
      this.idCardFile = file;
      this.idCardName = file.name;
      this.doctorForm.get('idCard')?.setValue(true);
    } else if (type === 'license') {
      this.licenseFile = file;
      this.licenseName = file.name;
      this.doctorForm.get('license')?.setValue(true);
    } else {
      this.certificateFile = file;
      this.certificateName = file.name;
      this.doctorForm.get('certificate')?.setValue(true);
    }
  }

  onSubmit(): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    const saved = localStorage.getItem('doctorBasicData');
    if (!saved) {
      this.router.navigate(['/auth/register']);
      return;
    }

    this.isLoading = true;
    this.apiError  = '';

    const basicData = JSON.parse(saved);
    const { specialization, yearsExperience, clinicAddress } = this.doctorForm.value;

    // دمج البيانات الأساسية مع البيانات المهنية
    const fullPayload = {
      ...basicData,
      licenseNumber:   this.licenseFile?.name ?? 'PENDING',
      certificate:     specialization,
      consultationFee: yearsExperience * 50,
      address:         clinicAddress,
      graduationDate:  '2000-01-01',
      departmentId:    1
    };

    this.authService.register(fullPayload).subscribe({
      next: () => {
        this.isLoading = false;
        localStorage.removeItem('doctorBasicData');
        this.router.navigate(['/auth/confirm-email-notice'], {
          queryParams: { email: basicData.email }
        });
      },
      error: () => {
        this.isLoading = false;
        localStorage.removeItem('doctorBasicData');
        this.router.navigate(['/auth/confirm-email-notice'], {
          queryParams: { email: basicData.email }
        });
      }
    });
  }
}