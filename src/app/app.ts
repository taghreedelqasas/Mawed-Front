import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { DocMain } from "./DoctorDashboard/doc-main/doc-main";
import { DoctorDash } from "./DoctorDashboard/doctor-dash/doctor-dash";

@Component({
  selector: 'app-root',
  // ضيفنا RouterOutlet هنا عشان الكومبوننت الرئيسي يعرض الصفحات
  imports: [RouterOutlet, Home, DocMain, DoctorDash], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Maw3ed');
}