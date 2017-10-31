
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserManager, Log, MetadataService, User } from 'oidc-client';
import { IDeploymentEnvironment, IAppConfig } from   './iappconfig.interface';
import { UserManagerSettings,OidcClientSettings  } from 'oidc-client';

@Injectable()
export class AdlGlobalConfig {

//
// "fileApiUrl": "https://wiki.adldelivery.com/wikifile"
//"fileApiUrl": "https://wiki.adldelivery.com/wikifile"
//
//
//

  private _allSettings : IAppConfig = {
    "deploymentTarget": "Production",

    "deploymentEnvironments" : [
        {
            "name": "LocalDevelopment",
            "mode":"Development",
            "appUrl":"http://localhost:4200/",
            "apiUrl": "https://wiki.adldelivery.com/api/",
            "fileApiUrl": "https://wiki.adldelivery.com/wikifile/",
            "odataApiUrl": "https://wiki.adldelivery.com/wikiapi/",
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
        },
        {
          "name": "Production",
          "mode":"Production",
          "appUrl":"https://wiki.adldelivery.com/",
          "apiUrl": "https://wiki.adldelivery.com/api/",
          "fileApiUrl": "https://wiki.adldelivery.com/wikifile/",
          "odataApiUrl": "https://wiki.adldelivery.com/wikiapi/",
           "userManagerSettings": {
              "authority": "https://dev.adldelivery.com/id/",
              "client_id": "implicitclient",
              "redirect_uri": "https://wiki.adldelivery.com",
              "post_logout_redirect_uri": "https://wiki.adldelivery.com",
              "response_type": "id_token token",
              "scope": "openid email roles profile atrak",
              "silent_redirect_uri": "https://wiki.adldelivery.com/silentrenew.html",
              "automaticSilentRenew": true,
              "filterProtocolClaims": true,
              "loadUserInfo": true,
              "popup_redirect_uri": "https://wiki.adldelivery.com/postlogin.html",
              "popupWindowFeatures":"location=no,toolbar=no,width=500,height=500,left=700,top=200",
              "monitorSession": true,
              "checkSessionInterval": 2000,
              "revokeAccessTokenOnSignout": true,
              "popup_post_logout_redirect_uri": "https://wiki.adldelivery.com/postlogout.html",
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