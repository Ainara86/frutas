import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Componentes propios
import { CardComponent } from './components/card/card.component';
import { ComparadorComponent } from './components/comparador/comparador.component';
import { LoginComponent } from './components/login/login.component';
import { FomularioComponent } from './components/fomulario/fomulario.component';
import { ListadoComponent } from './components/listado/listado.component';

// providers o servicios
import { FrutaService } from './providers/fruta.service';
import { LoginService } from './providers/login.service';

//guards
import { BackofficeGuard } from './guards/backoffice.guard';
import { DescuentoPipe } from './pipes/descuento.pipe';





@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ComparadorComponent,
    LoginComponent,
    FomularioComponent,
    ListadoComponent,
    DescuentoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,          // banana in a box [(ngModule)]
    ReactiveFormsModule
  ],
  providers: [
    FrutaService,
    LoginService,
    BackofficeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
