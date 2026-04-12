import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Galeria } from './pages/galeria/galeria';
import { ArticuloSeleccionado } from './pages/articulo-seleccionado/articulo-seleccionado';
import { IniciarSesion } from './pages/iniciar-sesion/iniciar-sesion';
import { Registrarse } from './pages/registrarse/registrarse';
import { FormularioDeContacto } from './pages/formulario-de-contacto/formulario-de-contacto';
import { ConfigurarDireccionEntrega } from './pages/configurar-direccion-entrega/configurar-direccion-entrega';
import { VerCuenta } from './pages/ver-cuenta/ver-cuenta';
import { Pagar } from './pages/pagar/pagar';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'galeria', component: Galeria },
  { path: 'articulo-seleccionado/:id', component: ArticuloSeleccionado },
  { path: 'formulario-de-contacto', component: FormularioDeContacto },
  { path: 'registrarse', component: Registrarse },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'configurar-direccion-entrega', component: ConfigurarDireccionEntrega },
  { path: 'ver-cuenta', component: VerCuenta },
  { path: 'pagar', component: Pagar },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
