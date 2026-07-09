import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment';

@Component({
  selector: 'app-doc-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-main.html',
  styleUrl: './doc-main.css'
})
export class DocMain implements OnInit {
  protected dashService = inject(AppointmentService);

ngOnInit(): void {
  this.dashService.getUserProfile();  // ← الإضافة المطلوبة
  this.dashService.loadDashboardData();
  this.dashService.getWallet();
  this.dashService.getWalletTransactions();
}
}