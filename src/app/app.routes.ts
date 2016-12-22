import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NoContentComponent } from './no-content/no-content.component';

import { DataResolver } from './app.resolver';
import {AuthenticationCallbackActivateGuard} from "./auth/auth.guard";


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, /*canActivate: [AuthenticationCallbackActivateGuard]*/ },
  { path: 'home',  component: HomeComponent},
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    redirectTo: '' }
];

export const appRoutingProviders: any[] = [
  AuthenticationCallbackActivateGuard
];
