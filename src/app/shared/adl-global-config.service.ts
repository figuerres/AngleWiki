
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserManager, Log, MetadataService, User } from 'oidc-client';
import { IDeploymentEnvironment, IAppConfig } from   './iappconfig.interface';
import { UserManagerSettings,OidcClientSettings  } from 'oidc-client';

@Injectable()
export class AdlGlobalConfig {

  private _allSettings : IAppConfig = {
    "deploymentTarget": "LocalDevelopment",

    "deploymentEnvironments" : [
        {
            "name": "LocalDevelopment",
            "mode":"Development",
            "appUrl":"http://localhost:4200",
            "apiUrl": "https://devwebservice.adldelivery.com/api",
            "reportViewUrl": "https://report-view.adldelivery.com",
            "odataApiUrl": "https://devwebservice.adldelivery.com/atrakapi",

             "userManagerSettings": {

                "authority": "https://dev.adldelivery.com/id/",
                "client_id": "implicitclient",
                "redirect_uri": "http://localhost:4200",
                "post_logout_redirect_uri": "http://localhost:4200",
                "response_type": "id_token token",
                "scope": "openid email roles profile atrak",
                "silent_redirect_uri": "http://localhost:4200/silentrenew.html",
                "automaticSilentRenew": true,
                "filterProtocolClaims": true,
                "loadUserInfo": true,
                "popup_redirect_uri": "http://localhost:4200/postlogin.html",
                "popupWindowFeatures":"location=no,toolbar=no,width=500,height=500,left=700,top=200",
                "monitorSession": true,
                "checkSessionInterval": 2000,
                "revokeAccessTokenOnSignout": true,
                "popup_post_logout_redirect_uri": "http://localhost:4200/postlogout.html",

              }
        }
   
    ] 
  };

    get Settings()  : IDeploymentEnvironment {
          return  this._allSettings.deploymentEnvironments.find(x=>x.name == this._allSettings.deploymentTarget);  
    }

    constructor(  ) { 

    }
    


}