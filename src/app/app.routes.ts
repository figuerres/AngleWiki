import { RouterModule , Routes } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent   } from './login/login.component';

import { AuthGuardService   } from './shared/adl-global-auth-guard.service';

import { HomeComponent } from './home/home.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CategoriesComponent } from './categories/categories.component';
import { PagesComponent } from './pages/pages.component';
import { SettingsComponent } from './settings/settings.component';
import { NewPageComponent } from './new-page/new-page.component';
import { PageComponent } from './page/page.component';
import { WikiListComponent } from './wiki-list/wiki-list.component';
import { WikiTocComponent } from './wiki-toc/wiki-toc.component';
import { WikiComponent } from './wiki/wiki.component';

export const appRoutes: Routes = [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'home',
                component: HomeComponent,
                canActivate:[AuthGuardService],
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'wiki',
                   component: WikiListComponent
            },
            {
                path: 'wiki/:wikiId/:wikiTitle', 
                component: WikiTocComponent  
            },
            {
                path: 'wikitoc/:wikiId', 
                component: PagesComponent  
            },
                        
            {
                path: 'wiki/page/:id/:title',
                component: PageComponent
            },

            {
                path: 'newpage',
                component: NewPageComponent
            },
            {
                path: 'filemanager',
                component: FileManagerComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'unauthorized',
                component: UnauthorizedComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
               path: '**',
               component: NotFoundComponent
            }
];

