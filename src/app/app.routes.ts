import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import {PrufaComponent} from "./prufa/prufa.component";


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'prufa',  component: PrufaComponent },
  { path: '**',    component: NoContentComponent },
];
