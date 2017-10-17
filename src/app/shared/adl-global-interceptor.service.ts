import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { AdlGlobalAuth } from './adl-global-auth.service';

@Injectable()
export class AdlGlobalInterceptor implements HttpInterceptor {

  constructor( private authService: AdlGlobalAuth ) {   
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.loggedIn ) {
      if ( this.authService.currentUser ) {
        const authReq = req.clone(
          {  withCredentials: true,
             headers: req.headers.set('Authorization',  this.authService.currentUser.token_type + " " + this.authService.currentUser.access_token)
          }
        );
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }
}
