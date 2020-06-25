import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService){
      
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = this.auth.token
    if(token != null){
        const auth = req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+token)
          });
          return next.handle(auth);
    }
    return next.handle(req);
  }
}

