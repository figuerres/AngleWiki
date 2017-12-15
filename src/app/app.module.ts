import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { ErrorHandler } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadModule, ProgressbarModule, AlertModule, AccordionModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { MarkdownModule, MarkdownService } from 'angular2-markdown';
import { TreeModule } from 'angular-tree-component';
import { BusyModule } from 'angular2-busy';

import { WikiPagesService } from './services/wiki-pages.service';
import { WikiFilesService } from './services/wiki-files.service';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CategoriesComponent } from './categories/categories.component';

import { SettingsComponent } from './settings/settings.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';

import { WikiListComponent } from './wiki-list/wiki-list.component';


import { AdlGlobalInterceptor } from './shared/adl-global-interceptor.service';
import { ngfModule  } from './shared/ngf/ngf.module'

import { AdlGlobalAuth } from './shared/adl-global-auth.service';
import { AdlGlobalConfig } from './shared/adl-global-config.service';
import { AuthGuardService   } from './shared/adl-global-auth-guard.service';
import { AdlGlobalUser   } from './shared/adl-global-user.service';

import { WikiPageResolverService  } from './services/wiki-page-resolver.service';
import { WikiTocResolverService  } from './services/wiki-toc-resolver.service';
import { WikiNameListResolverService  } from './services/wiki-name-list-resolver.service';

import { WikiHomeNameListResolverService  } from './services/wiki-home-name-list-resolver.service';

import { HtmlOutlet } from './shared/adl-html-outlet.directive';



@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    FileManagerComponent,
    CategoriesComponent,
    SettingsComponent,
    EditPageComponent,
    HomeComponent,
    PageComponent,
    WikiListComponent,
    HtmlOutlet,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    TreeModule,
    RouterModule.forRoot(appRoutes ),
    ngfModule,
    BusyModule
  ],
  providers: [
    MarkdownService,
    WikiPageResolverService,
    WikiTocResolverService,
    WikiNameListResolverService,
    WikiHomeNameListResolverService,
    WikiPagesService,
    WikiFilesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdlGlobalInterceptor,
      multi: true,
    },
    AdlGlobalAuth,
    AdlGlobalConfig,
    AuthGuardService ,
    AdlGlobalUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
