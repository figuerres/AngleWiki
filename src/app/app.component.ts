import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


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
 
  constructor(
    private authService: AdlGlobalAuth,
    private configService: AdlGlobalConfig
   ){

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
}
