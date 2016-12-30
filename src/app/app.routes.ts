import { Routes, RouterModule, CanActivate} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NoContentComponent } from './no-content/no-content.component';

import { DataResolver } from './app.resolver';
import {AuthenticationCallbackActivateGuard} from "./auth/auth.guard";
import {PrufaComponent} from "./prufa/prufa.component";
import {LandingComponent} from "./landing/landing.component";


export const ROUTES: Routes = [
  { path: '',      component: LandingComponent },
  { path: 'landing',  component: LandingComponent },
  { path: 'home',  component: HomeComponent/*, canActivate: [AuthenticationCallbackActivateGuard]*/ },
  { path: 'prufa',  component: PrufaComponent },
  { path: '**',    redirectTo: '' }
];

export const appRoutingProviders: any[] = [
  AuthenticationCallbackActivateGuard
];
