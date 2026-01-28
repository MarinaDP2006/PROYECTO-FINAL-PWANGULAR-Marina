import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Angular In-Memory Web API
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Routes
import { routes } from './app.routes';

// Componentes
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { CharacterList } from './components/listaPersonaje/character-list';
import { CharacterDetail } from './components/detallesPersonaje/character-detail';
import { CharacterForm } from './components/formPersonaje/character-form';
import { WeaponList } from './components/listaArmas/weapon-list';
import { LocationList } from './components/listaLugares/location-list';

@NgModule({
  declarations: [
    App,
    CharacterList,
    CharacterDetail,
    CharacterForm,
    WeaponList,
    LocationList,
    Navbar
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
