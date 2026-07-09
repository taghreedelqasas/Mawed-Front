import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: 'doctor/:id',
    renderMode: RenderMode.Server   // ← SSR عند كل request بدل Prerender وقت الـ build
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
