import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { TypeaheadModule, ProgressbarModule, AlertModule, AccordionModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
// import { ModalModule } from 'angular2-modal';
import { MarkdownModule } from 'angular2-markdown';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';



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

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    FileDropDirective,
    LoginComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    FileManagerComponent,
    CategoriesComponent,
    PagesComponent,
    SettingsComponent,
    NewPageComponent,
    HomeComponent,
    PageComponent
  ],
  imports: [

    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    Ng2BootstrapModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
   // ModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
    MarkdownModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
