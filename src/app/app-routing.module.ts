import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparadorComponent } from './components/comparador/comparador.component';

const routes: Routes = [
  { path: 'comparador', component: ComparadorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
