import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment';

@Component({
  selector: 'app-doc-consultations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-consulations.html',
  styleUrl: './doc-consulations.css'
})
export class DocConsultations implements OnInit {
  protected appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    // السيرفيس الحقيقي فيه دالة للمحادثات، الـ HTML الآن يقرأ السجنالز الحقيقية مباشرة
  }
}