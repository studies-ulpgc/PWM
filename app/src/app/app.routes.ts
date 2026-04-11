import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Galeria } from './pages/galeria/galeria';
import { ArticuloSeleccionado } from './pages/articulo-seleccionado/articulo-seleccionado';
import { IniciarSesion } from './pages/iniciar-sesion/iniciar-sesion';
import { Registrarse } from './pages/registrarse/registrarse';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'galeria', component: Galeria },
  { path: 'articulo-seleccionado/:id', component: ArticuloSeleccionado },
  { path: 'registrarse', component: Registrarse },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
