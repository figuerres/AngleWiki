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
import { EditPageComponent } from './edit-page/edit-page.component';
import { PageComponent } from './page/page.component';
import { WikiListComponent } from './wiki-list/wiki-list.component';
import { WikiTocComponent } from './wiki-toc/wiki-toc.component';
import { WikiComponent } from './wiki/wiki.component';

import { WikiPageResolverService  } from './services/wiki-page-resolver.service';

import { WikiTocResolverService  } from './services/wiki-toc-resolver.service';

import { WikiNameListResolverService  } from './services/wiki-name-list-resolver.service';

import { WikiHomeNameListResolverService  } from './services/wiki-home-name-list-resolver.service';

export const appRoutes: Routes = [
            {
                path: '',
                resolve: { 
                    wikiList: WikiHomeNameListResolverService
                 },
                component: HomeComponent
            },
            {
                path: 'home',
                resolve: { 
                    wikiList: WikiHomeNameListResolverService
                 },                
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
                resolve: { 
                    page: WikiPageResolverService, 
                    toc: WikiTocResolverService
                 },
                component: PageComponent
            },
            {
                path: 'wikipage/add',
                resolve: { 
                    page: WikiPageResolverService,
                    nameList: WikiNameListResolverService
                 },                
                component: EditPageComponent,
                canActivate:[AuthGuardService],
            },
            {
                path: 'wikipage/edit/:id/:title',
                resolve: { 
                    page: WikiPageResolverService,
                    nameList: WikiNameListResolverService
                 },
                component: EditPageComponent,
                canActivate:[AuthGuardService],
            },
            {
                path: 'filemanager',
                component: FileManagerComponent,
                canActivate:[AuthGuardService],
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate:[AuthGuardService],
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

