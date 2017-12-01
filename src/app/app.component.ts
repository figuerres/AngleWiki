import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AdlGlobalConfig } from './shared/adl-global-config.service';
import { AdlGlobalAuth } from './shared/adl-global-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  user: Oidc.User;
  loadedUserSub: any;
  unloadedUserSub: any;
  loading: boolean = true;
  busy: Subscription;
  constructor(
    private router: Router,
    private authService: AdlGlobalAuth,
    private configService: AdlGlobalConfig
   ){
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
  });

  }


  checkRouterEvent(routerEvent: Event): void {
    // console.log("routerEvent: Event = ", routerEvent  );
    if (routerEvent instanceof NavigationStart) {
       // this.loading = true;
       if(!this.busy){
         this.busy=   this.router.events.subscribe((routerEvent: Event) => {
           console.log(" in busy routerEvent: Event = ", routerEvent  );
          });
       }
    }
    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          if (this.busy ){
            //  this.loading = false;
            console.log(" unsubscribe now routerEvent: Event = ", routerEvent  );
            this.busy.unsubscribe();
            this.busy = null;
        }
    }
  }

  ngOnInit() {
    /*
     * handle user load event after user login
     *
     */
    this.loadedUserSub = this.authService.userLoadededEvent
      .subscribe(user => {
        this.user = user;
        console.log(" AppComponent  user loaded event fired ");
        console.log(this.user);
      });
    /*
     * handle user unloaded event after user has logged out
     *
     */
    this.unloadedUserSub = this.authService.userUnLoadededEvent
      .subscribe(x => { 
        console.log(" AppComponent  user un loaded event fired ");
        this.user = null;
      });
  }


  userSignOut(){
    this.authService.mgr.signoutPopup().then(function() {
        console.log(" signed out ");
   //     this.router.navigate(['/']);
    }).catch(function(err) {
        console.log(err);
    });

  }

  revoke(){
      this.authService.revokeToken();
  }


  //
  // clean up on exit.
  //
  ngOnDestroy(){
      if(this.loadedUserSub.unsubscribe()){
          this.loadedUserSub.unsubscribe();
      }
  }

}
