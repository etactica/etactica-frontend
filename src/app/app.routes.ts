import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NoContentComponent } from './no-content/no-content.component';

import { DataResolver } from './app.resolver';
import {AuthenticationCallbackActivateGuard} from "./auth/auth.guard";
import {PrufaComponent} from "./prufa/prufa.component";


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, /*canActivate: [AuthenticationCallbackActivateGuard]*/ },
  { path: 'home',  component: HomeComponent },
  { path: 'prufa',  component: PrufaComponent },
  { path: '**',    redirectTo: '' }
];

export const appRoutingProviders: any[] = [
  AuthenticationCallbackActivateGuard
];
