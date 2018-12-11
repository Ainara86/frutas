import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparadorComponent } from './components/comparador/comparador.component';
import { LoginComponent } from './components/login/login.component';
import { BackofficeGuard } from './guards/backoffice.guard';
import { FomularioComponent } from './components/fomulario/fomulario.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  { path: '',   redirectTo: '/comparador', pathMatch: 'full' },
  { path: 'comparador', component: ComparadorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'formulario', component: FomularioComponent, canActivate: [BackofficeGuard] },
  { path: 'detalle/:id', component: FomularioComponent, canActivate: [BackofficeGuard]},
  { path: 'listado', component: ListadoComponent, canActivate: [BackofficeGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
