

import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserManager, Log, MetadataService,  MetadataServiceCtor, User } from 'oidc-client';

import { AdlGlobalConfig } from './adl-global-config.service';
import { IDeploymentEnvironment } from   './iappconfig.interface';


@Injectable()
export class AdlGlobalAuth {

  private storage : any;
  private settings:  IDeploymentEnvironment;
  private userStateString : string;
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  userUnLoadededEvent: EventEmitter<any> = new EventEmitter<any>();
  userTokenExpiredEvent:  EventEmitter<any> = new EventEmitter<any>();
  public mgr: UserManager;
  public currentUser:User;
  public loggedIn: boolean = false;

  constructor(  private router: Router,  private configService: AdlGlobalConfig  ) {

    //// To turn on the logger uncomment the below line
    //// will give many details of the auth process...
   // Log.logger = <any>console;
    this.storage = sessionStorage;  
    this.settings = this.configService.Settings;
    this.mgr = new UserManager(this.settings.userManagerSettings);

    this.userStateString = "oidc.user:" + this.settings.userManagerSettings.authority + ':' + this.settings.userManagerSettings.client_id;

    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.userLoadededEvent.emit(user); 
        }
        else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });

    this.mgr.events.addUserUnloaded((e) => {
      console.log("user unloaded");
      this.currentUser = null;
      this.loggedIn = false;
      this.userUnLoadededEvent.emit("");
    });

   this.mgr.events.addAccessTokenExpired((e) => {
        console.log(" user token expired ");
        this.mgr.signoutPopup().then(function() {
              console.log("access token expired -> signed out");
          }).catch(function(err) {
              console.log(err);
          });
      });
  }
  // end of constructor

  
  private retrieve(key: string): any {
    var item = this.storage.getItem(key);
    if (item && item !== 'undefined') {
      return JSON.parse(this.storage.getItem(key));
    }
    return;
  }

revokeToken(){
  this.mgr.revokeAccessToken();
      this.mgr.signoutPopup().then(function() {
            console.log("access token revoked -> signed out");
        }).catch(function(err) {
            console.log(err);
        });
}


  clearState() {
    this.mgr.clearStaleState().then(function () {
     // console.log("clearStateState success");
    }).catch(function (e) {
      console.log("clearStateState error", e.message);
    });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
     // console.log("got user", user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      console.log("user removed");
       this.currentUser = null;
      this.loggedIn = false;
      this.userUnLoadededEvent.emit("");
    }).catch(function (err) {
      console.log(err);
    });
  }

}
