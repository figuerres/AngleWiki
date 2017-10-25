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
  public mgr: UserManager;
  private u: User;

  constructor(  private configService: AdlGlobalConfig ) {
    this.settings = this.configService.Settings;
    this.mgr = new UserManager(this.settings.userManagerSettings);
    Observable.interval(2000).subscribe(x=> {
        this.mgr.getUser().then((user) => {
          if (user) {
            if( this.u){
              if(  JSON.stringify( user) === JSON.stringify(this.u)){
              }else{
                this.u = user;
                this._userStateSource.next(true);
                this._userSource.next(user);
              }
            }else{
              this.u = user;
              this._userStateSource.next(true);
              this._userSource.next(user);
            }
          } else {
            if( this.u){
              this.u = null;
              this._userStateSource.next(false);
              this._userSource.next(null);
            }
          }
        }).catch((err) => {
          this.u =null;
          this._userStateSource.next(false);
          this._userSource.next(null);
        });
      });
    this.mgr.getUser().then((user) => {
      if (user) {
        this._userStateSource.next(true);
        this._userSource.next(user);
      } else {
        this._userStateSource.next(false);
        this._userSource.next(null); 
      }
    }).catch((err) => {
      this._userStateSource.next(false);
      this._userSource.next(null);
    });
  }
}