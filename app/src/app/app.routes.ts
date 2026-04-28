import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { ArticuloSeleccionadoComponent } from './pages/articulo-seleccionado/articulo-seleccionado.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { FormularioDeContactoComponent } from './pages/formulario-de-contacto/formulario-de-contacto.component';
import { ConfigurarDireccionEntregaComponent } from './pages/configurar-direccion-entrega/configurar-direccion-entrega.component';
import { VerCuentaComponent } from './pages/ver-cuenta/ver-cuenta.component';
import { PagarComponent } from './pages/pagar/pagar.component';
import { VerCestaComponent } from './pages/ver-cesta/ver-cesta.component';
import { ListaDeseadosComponent } from './pages/lista-deseados/lista-deseados.component';
import { ListaPedidosRealizadosComponent } from './pages/lista-pedidos-realizados/lista-pedidos-realizados.component';
import { InformacionComponent } from './pages/informacion/informacion.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'articulo-seleccionado/:id', component: ArticuloSeleccionadoComponent },
  { path: 'formulario-de-contacto', component: FormularioDeContactoComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'configurar-direccion-entrega', component: ConfigurarDireccionEntregaComponent },
  { path: 'ver-cuenta', component: VerCuentaComponent },
  { path: 'pagar', component: PagarComponent },
  { path: 'ver-cesta', component: VerCestaComponent },
  { path: 'lista-deseados', component: ListaDeseadosComponent },
  { path: 'mis-pedidos', component: ListaPedidosRealizadosComponent },
  { path: 'informacion/:id', component: InformacionComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
