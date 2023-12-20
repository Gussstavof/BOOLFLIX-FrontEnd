import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('signup') || req.url.includes('signin')) {
      return next.handle(req);
    }

    let token = sessionStorage.getItem('token')

    const cloneReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(cloneReq);
  }
}
