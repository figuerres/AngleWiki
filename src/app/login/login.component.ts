import {Component} from '@angular/core';
import { OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AdlGlobalConfig } from '../shared/adl-global-config.service';
import { AdlGlobalAuth } from '../shared/adl-global-auth.service';

@Component({
    template: `<div [ngBusy]="busy"></div>`  
})

export class LoginComponent  implements OnInit {
    busy: Promise<any>; 
    constructor( private authService: AdlGlobalAuth,
      
        private router: Router,
    private route: ActivatedRoute 
     ) { }   

   ngOnInit() {
       this.busy = this.authService.mgr.signinPopup().then( (user: Oidc.User) => {
       this.authService.loggedIn = true;
       this.authService.currentUser = user;
       this.authService.userLoadededEvent.emit(user);
       this.router.navigate(['/home']);  
        }).catch( (err)=> {
          console.log(err);
        });
   }
}