import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SampleInterceptor } from './http-interceptors/http-interceptors.interceptor';

export const appConfig: ApplicationConfig = {
  // providers: [
  //   provideRouter(routes),
  //   provideClientHydration(),
  //   provideAnimationsAsync(),
  //   provideHttpClient(withInterceptors([authInterceptor]),withFetch(),withInterceptorsFromDi()),
  // ],
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(),withFetch()),  
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SampleInterceptor,
      multi:true
    }
  ]
};

