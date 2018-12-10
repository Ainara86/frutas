import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Componentes propios
import { CardComponent } from './components/card/card.component';
import { ComparadorComponent } from './components/comparador/comparador.component';

// providers o servicios


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ComparadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
