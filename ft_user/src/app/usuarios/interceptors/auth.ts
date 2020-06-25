import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private router:Router){
      
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
   
    return next.handle(req).pipe(
      catchError(e =>{
        if(e.status == 401 ){
          this.router.navigate(['/login'])
          if(this.auth.isAuthenticated()){
            this.auth.logout()
          }
          
        }
        if(e.status == 403){
          this.router.navigate(['/clientes'])
          
        }
        return throwError(e)
      })
    );
  }
}

