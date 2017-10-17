import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { ErrorHandler } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { TypeaheadModule, ProgressbarModule, AlertModule, AccordionModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { MarkdownModule } from 'angular2-markdown';
import { TreeModule } from 'angular-tree-component';


import { WikiPagesService } from './services/wiki-pages.service';
import { WikiFilesService } from './services/wiki-files.service';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CategoriesComponent } from './categories/categories.component';
import { PagesComponent } from './pages/pages.component';
import { SettingsComponent } from './settings/settings.component';
import { NewPageComponent } from './new-page/new-page.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
//  import { WikiComponent } from './wiki/wiki.component';

import { WikiListComponent } from './wiki-list/wiki-list.component';
import { WikiTocComponent } from './wiki-toc/wiki-toc.component';

//import { AdlLoggerService } from './shared/adl-logger.service';
import { AdlGlobalInterceptor } from './shared/adl-global-interceptor.service';
import { ngfModule  } from './shared/ngf/ngf.module'

import { AdlGlobalAuth } from './shared/adl-global-auth.service';
import { AdlGlobalConfig } from './shared/adl-global-config.service';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    FileManagerComponent,
    CategoriesComponent,
    PagesComponent,
    SettingsComponent,
    NewPageComponent,
    HomeComponent,
    PageComponent,
    WikiListComponent,
    WikiTocComponent
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2BootstrapModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
    MarkdownModule,
    TreeModule,
    RouterModule.forRoot(appRoutes),
    ngfModule
  ],
  providers: [
    WikiPagesService,
    WikiFilesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdlGlobalInterceptor,
      multi: true,
    },
    AdlGlobalAuth,
    AdlGlobalConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
