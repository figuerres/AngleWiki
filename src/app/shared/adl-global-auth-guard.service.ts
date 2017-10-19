import { Injectable } from '@angular/core';
import { Route, CanActivate, CanLoad, CanDeactivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { AdlGlobalConfig } from '../shared/adl-global-config.service';
import { AdlGlobalAuth } from '../shared/adl-global-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate , CanLoad {
  
  constructor(private authService: AdlGlobalAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //=======================================================
    // todo :  expand on this sample to handle user roles
    //=======================================================
    var naviPath: string;
    var activate: boolean = false;

    if (this.authService.loggedIn) { 
      activate = true; 
    } else {
      // this is the path to getting a user to login.
      //  later there will also be a route to "Unauthorized" for some cases
      // save the requested path / view so that they can get there
      // after they have logged in
      naviPath =  (state.url.substr(0,1) == '/'  ? state.url.substring(1) : state.url);
      this.authService.mgr.signinPopup()
          .then( (user: Oidc.User) => {
              this.authService.loggedIn = true;
              this.authService.currentUser = user;
              this.authService.userLoadededEvent.emit(user);
              activate = true; 
              this.router.navigateByUrl(naviPath);
            })
          .catch((err)=> { console.log(err); });

    }
      console.log("return activate = ", activate);
      return activate;
  }

  canLoad(route: Route) {
    var naviPath: string;
    var load: boolean = false;
    if (this.authService.loggedIn) { 
      load = true;  
    } else {
      naviPath =  ( location.pathname.substr(0,1) == '/'  ? location.pathname.substring(1) :location.pathname);
      console.log("canLoad()  naviPath  ", naviPath   );
      console.log("    ",  this.router.url);
      this.authService
          .mgr
          .signinPopup()
          .then((user: Oidc.User) => {
            this.authService.loggedIn = true;
            this.authService.currentUser = user;
            this.authService.userLoadededEvent.emit(user);
            load = true; 
      
            if(naviPath) {
              this.router.navigate([   naviPath ]);
            }
            })
          .catch( (err)=> {
              console.log(err);
            });
        }

    return load;
  }
}

