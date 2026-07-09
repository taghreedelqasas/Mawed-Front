import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = authService.getAccessToken();
  console.log('🔍 Token value:', token ? token.substring(0, 20) + '...' : token);

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // ⚠️ مؤقتًا: مفيش auto-refresh ولا auto-logout لحد ما نتأكد من مسار الـ refresh endpoint الصح
  return next(req);
};