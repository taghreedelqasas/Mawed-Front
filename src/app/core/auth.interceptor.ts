// core/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

// ده اسم الـ "خانة" في localStorage اللي التوكن هيتخزن جواها، مش التوكن نفسه
const TOKEN_KEY = 'token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(cloned);
};