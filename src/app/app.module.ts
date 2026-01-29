import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Angular In-Memory Web API para simulación de backend
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Configuración de rutas
import { routes } from './app.routes';

// Componentes de la aplicación
import { App } from './app';
import { Inicio } from './components/inicio/inicio';
import { Navbar } from './components/navbar/navbar';
import { CharacterList } from './components/listaPersonaje/character-list';
import { CharacterDetail } from './components/detallesPersonaje/character-detail';
import { CharacterForm } from './components/formPersonaje/character-form';
import { WeaponList } from './components/listaArmas/weapon-list';
import { LocationList } from './components/listaLugares/location-list';

@NgModule({
  declarations: [
    App,                // Componente raíz de la aplicación
    Inicio,             // Página de inicio/dashboard
    CharacterList,      // Lista de personajes con filtros
    CharacterDetail,    // Vista detallada de personaje individual
    CharacterForm,      // Formulario CRUD para personajes
    WeaponList,         // Catálogo de armas del universo MOTU
    LocationList,       // Directorio de lugares de Eternia
    Navbar              // Barra de navegación principal
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      // Opciones de configuración del router
      enableTracing: false,
      scrollPositionRestoration: 'top'
    }),
   HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {
        dataEncapsulation: false,
        delay: 300,
        passThruUnknownUrl: true
      }
    )
  ],
  providers: [
  ],
  bootstrap: [App]
})
export class AppModule {
  constructor() {
    console.log('// MOTU Universe App Module initialized');
  }
}
