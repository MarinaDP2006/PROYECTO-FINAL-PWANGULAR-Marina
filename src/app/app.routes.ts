import { Routes } from '@angular/router';
import { CharacterList } from './components/listaPersonaje/character-list';
import { WeaponList } from './components/listaArmas/weapon-list';
import { LocationList } from './components/listaLugares/location-list';
import { CharacterForm } from './components/formPersonaje/character-form';
import { CharacterDetail } from './components/detallesPersonaje/character-detail';

// Rutas de acceso a los componentes
export const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'character-detail/:id', component: CharacterDetail },
  { path: 'character-form', component: CharacterForm },
  { path: 'character-form/:id', component: CharacterForm },
  { path: 'weapons', component: WeaponList },
  { path: 'locations', component: LocationList },
  { path: '**', redirectTo: '/characters' }
];
