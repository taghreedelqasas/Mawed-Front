import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { authInterceptor } from './core/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: () => false   // عطّلي الكاش خالص لكل الـ HTTP requests
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ]
};