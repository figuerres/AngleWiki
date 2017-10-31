import { UserManagerSettings,OidcClientSettings  } from 'oidc-client';


    export interface IDeploymentEnvironment {
        name: string;
        mode: string;
        appUrl: string;
        apiUrl: string;
        fileApiUrl?: string;
        odataApiUrl?: string;
        userManagerSettings:  UserManagerSettings;
    }

    export interface IAppConfig {
        deploymentEnvironments: IDeploymentEnvironment[];
        deploymentTarget: string;
    }

