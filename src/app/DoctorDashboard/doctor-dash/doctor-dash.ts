import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AppointmentService } from '../services/appointment';

@Component({
  selector: 'app-doctor-dash',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './doctor-dash.html',
  styleUrl: './doctor-dash.css'
})
export class DoctorDash implements OnInit {
  protected dashService = inject(AppointmentService);

  ngOnInit(): void {
    // استخدمي userProfile (حقيقي 100%) بدل doctor() في الـ Header/الترحيب
    if (!this.dashService.userProfile()) {
      this.dashService.getUserProfile();
    }
  }
}