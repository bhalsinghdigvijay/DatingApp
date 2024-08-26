import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { loadingInterceptor } from './_interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        errorInterceptor,
        jwtInterceptor,
        loadingInterceptor
      ])
    ), 
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)],  
};
