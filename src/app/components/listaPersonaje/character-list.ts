import { Component, signal, inject, computed, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Personaje } from '../interfaces/motu-types';
import { MotuData } from '../servicioDATA/motu-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList implements OnInit, OnDestroy {
  private router = inject(Router);
  private motuData = inject(MotuData);

  characters = signal<Personaje[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  private subscriptions: Subscription[] = [];

  filteredCharacters = computed(() => {
    return this.characters();
  });

  ngOnInit() {
    this.loadCharacters();
    this.subscribeToServiceData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private subscribeToServiceData() {
    // Suscribirse a los datos de personajes
    this.subscriptions.push(
      this.motuData.personajes$.subscribe(personajes => {
        this.characters.set(personajes);
      })
    );

    // Suscribirse al estado de carga
    this.subscriptions.push(
      this.motuData.loading$.subscribe(loading => {
        this.loading.set(loading);
      })
    );

    // Suscribirse a errores
    this.subscriptions.push(
      this.motuData.error$.subscribe(error => {
        this.error.set(error);
      })
    );
  }

  private loadCharacters() {
    this.motuData.getPersonajes().subscribe();
  }

  viewCharacter(id: string) {
    this.router.navigate(['/character-detail', id]);
  }

  // Maneja errores de carga de imágenes
  onImageError(event: any) {
    event.target.style.display = 'none';
    if (event.target.parentElement) {
      event.target.parentElement.style.backgroundColor = '#e9ecef';
      event.target.parentElement.innerHTML += '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d; font-size: 12px;">Sin imagen</div>';
    }
  }
}
