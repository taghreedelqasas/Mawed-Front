import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'token'; 

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // 1. نتحقق أولاً هل الكود يعمل في المتصفح أم على السيرفر؟
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem(TOKEN_KEY);

    // 2. إذا وجدنا التوكن، نقوم بعمل clone للطلب ونضيف الهيدر
    if (token) {
      const cloned = req.clone({
        setHeaders: { 
          Authorization: `Bearer ${token}` 
        },
      });
      return next(cloned);
    }
  }

  // 3. إذا كنا على السيرفر، أو لم يكن هناك توكن في المتصفح، يمر الطلب كما هو
  return next(req);
};