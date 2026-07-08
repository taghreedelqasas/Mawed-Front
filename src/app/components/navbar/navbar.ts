import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // ظبطي المسار حسب مكان الملف عندك

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isMenuOpen = false;

  constructor(private router: Router, public authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false;

    if (this.router.url === '/') {
      this.scrollNow(sectionId);
    } else {
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

onLogout(): void {
  this.isMenuOpen = false;
  this.authService.logout().subscribe({
    next: () => this.finishLogout(),
    error: () => this.finishLogout(), // حتى لو فشل الـ API، امسحي محليًا وطلعي على طول
  });
}

private finishLogout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRoles');
  localStorage.removeItem('userId');
  this.router.navigate(['/']);
}
}