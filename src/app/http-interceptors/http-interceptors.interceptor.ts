import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SampleInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('token');
        if (token) {
          const cloned = request.clone({
            setHeaders: {
              authorization: token,
            },
          });
          return next.handle(cloned);
        } else {
          return next.handle(request);
        }
      
    }
}