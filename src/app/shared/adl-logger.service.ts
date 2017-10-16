import { Injectable } from '@angular/core';

import {getLogger,  getDefaultLogger,  
    logLog, Logger, getRootLogger,
     getNullLogger, InPageAppender,
      HttpPostDataLayout, LoggingEvent,
       Appender, AjaxAppender,
        BrowserConsoleAppender, PopUpAppender, AlertAppender,JsonLayout
     } from 'log4javascript'

//import { ConfigService } from './config.service';

//import { AuthService } from './auth.service';

//import { IDeploymentEnvironment } from   '../../types/IAppConfig.interface';


@Injectable()
export class AdlLoggerService {
   public  log: Logger;
    // user: Oidc.User; 
    loadedUserSub: any;
    layout:  JsonLayout;
     app: AjaxAppender;

    constructor(
     //    private configService: ConfigService,  private authService: AuthService
         ) {

        // this.loadedUserSub = this.authService.userLoadededEvent
        // .subscribe(user => {
        //     this.user = user;
        //        this.layout.setCustomField( "user", user.profile.sub);
        // });

        
        //this.log = getDefaultLogger();
       // this.log = getLogger();
        this.log = getRootLogger()
        this.app = new AjaxAppender( 'https://devwebservice.adldelivery.com/api/adllogger/log');
        this.layout = new JsonLayout(false,false);
        this.layout.setCustomField( "language",navigator.language);
        this.layout.setCustomField( "userAgent",navigator.userAgent);
        this.layout.setCustomField( "tzOffset",  new Date().getTimezoneOffset().toString() );
        this.layout.setCustomField( "user", "0" );
        this.app.setLayout( this.layout);
        this.app.addHeader("Content-Type", "application/json");
        this.log.addAppender(this.app);     
    }
}
