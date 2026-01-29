import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { CharacterList } from './components/listaPersonaje/character-list';
import { WeaponList } from './components/listaArmas/weapon-list';
import { LocationList } from './components/listaLugares/location-list';
import { CharacterForm } from './components/formPersonaje/character-form';
import { CharacterDetail } from './components/detallesPersonaje/character-detail';

// Configuración de rutas de la aplicación MOTU Universe
export const routes: Routes = [
  // Ruta raíz - redirige al inicio
  {
    path: '',
    component: Inicio,
    title: 'MOTU Universe - Inicio'
  },
  {
    path: 'inicio',
    component: Inicio,
    title: 'MOTU Universe - Inicio'
  },
  {
    path: 'characters',
    component: CharacterList,
    title: 'Personajes - MOTU Universe'
  },
  {
    path: 'character-detail/:id',
    component: CharacterDetail,
    title: 'Detalle del Personaje - MOTU Universe'
  },
  {
    path: 'character-form',
    component: CharacterForm,
    title: 'Nuevo Personaje - MOTU Universe'
  },
  {
    path: 'character-form/:id',
    component: CharacterForm,
    title: 'Editar Personaje - MOTU Universe'
  },
  {
    path: 'weapons',
    component: WeaponList,
    title: 'Armas - MOTU Universe'
  },
  {
    path: 'locations',
    component: LocationList,
    title: 'Lugares - MOTU Universe'
  },
  // Ruta wildcard: captura cualquier ruta no definida arriba. Redirige a la lista de personajes como página por defecto
  {
    path: '**',
    redirectTo: '/characters',
    pathMatch: 'full'
  }
];
