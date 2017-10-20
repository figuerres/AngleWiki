import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserManager, Log, MetadataService,  MetadataServiceCtor, User } from 'oidc-client';

import { AdlGlobalConfig } from './adl-global-config.service';
import { IDeploymentEnvironment } from   './iappconfig.interface';

@Injectable()
export class AdlGlobalUser {

private settings:  IDeploymentEnvironment;
private _userSource = new BehaviorSubject<User>(null);
private _userStateSource = new BehaviorSubject<boolean>(false);
public user = this._userSource.asObservable();
public loggedIn = this._userStateSource.asObservable();
private mgr: UserManager;

  constructor(  private configService: AdlGlobalConfig 
  ) {
    this.settings = this.configService.Settings;
    this.mgr = new UserManager(this.settings.userManagerSettings);
    this.mgr.getUser()
    .then((user) => {
      if (user) {
       this._userStateSource.next(true);
       this._userSource.next(user); 
      }
      else {
        this._userStateSource.next(false);
        this._userSource.next(null); 
      }
    })
    .catch((err) => {
     this._userStateSource.next(false);
     this._userSource.next(null); 
    });

  this.mgr.events.addUserUnloaded((e) => {
    console.log("user unloaded");
   this._userStateSource.next(false);
   this._userSource.next(null); 
  });

  this.mgr.events.addUserLoaded((e) => {
    console.log("user loaded");
    this.mgr.getUser()
    .then((user) => {
      if (user) {
       this._userStateSource.next(true);
       this._userSource.next(user); 
      }
      else {
        this._userStateSource.next(false);
        this._userSource.next(null); 
      }
    })
    .catch((err) => {
     this._userStateSource.next(false);
     this._userSource.next(null); 
    });
  });

 this.mgr.events.addAccessTokenExpired((e) => {
      console.log(" user token expired ");
      this.mgr.signoutPopup().then(function() {
            console.log("access token expired -> signed out");
           this._userStateSource.next(false);
           this._userSource.next(null); 
        }).catch(function(err) {
          this._userStateSource.next(false);
          this._userSource.next(null); 
            console.log(err);
        });
    });

  }





}

