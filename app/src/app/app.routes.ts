import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { AuthComponent } from './components/auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent }
];
