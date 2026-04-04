import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Galeria } from './pages/galeria/galeria';
import { ArticuloSeleccionado } from './pages/articulo-seleccionado/articulo-seleccionado';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'galeria', component: Galeria },
  { path: 'articulo-seleccionado/:id', component: ArticuloSeleccionado },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
