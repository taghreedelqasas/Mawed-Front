import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false; // يقفل الـ mobile menu لو مفتوح

    if (this.router.url === '/') {
      // إحنا أصلاً في الـ Home، نعمل scroll على طول
      this.scrollNow(sectionId);
    } else {
      // في صفحة تانية، لازم نروح الـ Home الأول وبعدين نعمل scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollNow(sectionId), 150);
      });
    }
  }

  private scrollNow(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}