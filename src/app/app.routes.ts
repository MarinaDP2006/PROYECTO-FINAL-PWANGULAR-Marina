import { Routes } from '@angular/router';
import { CharacterList } from './components/character-list/character-list';
import { WeaponList } from './components/weapon-list/weapon-list';
import { LocationList } from './components/location-list/location-list';
import { CharacterForm } from './components/character-form/character-form';
import { CharacterDetail } from './components/character-detail/character-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'characters/:id', component: CharacterDetail },
  { path: 'weapons', component: WeaponList },
  { path: 'locations', component: LocationList },
  { path: 'add', component: CharacterForm },
  { path: 'edit/:id', component: CharacterForm },
  { path: '**', redirectTo: '/characters' }
];
