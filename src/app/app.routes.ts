import { RouterModule , Routes } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent   } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CategoriesComponent } from './categories/categories.component';
import { PagesComponent } from './pages/pages.component';
import { SettingsComponent } from './settings/settings.component';
import { NewPageComponent } from './new-page/new-page.component';
import { PageComponent } from './page/page.component';

export const appRoutes: Routes = [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'pages',
                component: PagesComponent
            },
            {
                path: 'page/:id/:title',
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




            // {
            //     path: 'home',
            //     component: HomeComponent,
            //     canActivate:[AuthGuardService],
            // },
            // {
            //     path: 'services',
            //     children: [
            //         {path: "", pathMatch: 'full', component: ServicesComponent},
            //         {path: ":service",  component: ServicesComponent }
            //     ]
            // },
            // {
            //     path: 'locations',
            //     component: LocationsComponent
            // },
            // {
            //     path: 'careers',
            //     component: CareersComponent
            // },
            // {
            //     path: 'about-us',
            //     component: AboutUsComponent
            // },
            // {
            //     path: 'contact-us',
            //     component: ContactUsComponent
            // },
            // {
            //     path: 'service-area/:fromZip/:toZip',
            //     component: ServiceAreaComponent
            // },
            // {
            //     path: 'reports',
            //     loadChildren: 'app/reports/reports.module#ReportsModule',
            //     data: { preload: true }
            // },
            // {
            //     path: 'track',
            //     loadChildren: 'app/track/track.module#TrackModule',
            //     data: { preload: true }
            // },
            // {
            //     path: 'manage',
            //     children: [
            //         {
            //             path: 'my-profile',
            //             loadChildren: 'app/manage/my-profile/my-profile.module#MyProfileModule'
            //         },
            //         {
            //             path: 'users',
            //             loadChildren: 'app/manage/users/users.module#UsersModule'
            //         },
            //         {
            //             path: 'customers',
            //             loadChildren: 'app/manage/business-entities/business-entities.module#BusinessEntitiesModule'
            //         },
            //         {
            //             path: 'system',
            //             loadChildren: 'app/manage/system/system.module#SystemModule'
            //         },
            //         {
            //             path: 'my-company',
            //             loadChildren: 'app/manage/my-company/my-company.module#MyCompanyModule'
            //         },
            //         {
            //             path: 'logistics',
            //             loadChildren: 'app/manage/logistics/logistics.module#LogisticsModule'
            //         }
            //     ]
            // },
            // {
            //     path: 'account/:mode/:id/:userid/:token',
            //     component: AccountComponent,
            // },
