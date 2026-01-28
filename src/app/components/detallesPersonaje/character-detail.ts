import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personaje } from '../interfaces/motu-types';
import { MotuData } from '../servicioDATA/motu-data';

@Component({
  selector: 'app-character-detail',
  standalone: false,
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css',
})
export class CharacterDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private motuData = inject(MotuData);

    character = signal<Personaje | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');
  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.motuData.filtrarEntidades({ tipo: 'personaje' }).subscribe((entidades: any[]) => {
        const personajes = entidades as Personaje[];
        const personaje = personajes.find(p => p.id === id);
        this.character.set(personaje || null);
      });
    }
  }
  editCharacter() {
    if (this.character()) {
      this.router.navigate(['/character-form', this.character()!.id]);
    }
  }
  // Elimina el personaje actual después de confirmación del usuario
  deleteCharacter() {
    if (this.character() && confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
      this.motuData.eliminarEntidad(this.character()!.id);
      this.router.navigate(['/characters']);
    }
  }
  // Navega de vuelta a la lista de personajes
  goBack() {
    this.router.navigate(['/characters']);
  }
    // Método que retorna un icono vacío para la facción del personaje (anteriormente con emojis)
  getFactionIcon(faction: string): string {
    switch (faction) {
      case 'buenos': return '';
      case 'malos': return '';
      case 'neutrales': return '';
      default: return '';
    }
  }
  // Método que retorna un icono vacío para la categoría del personaje (anteriormente con emojis)
  getCategoryIcon(categoria: string): string {
    switch (categoria) {
      case 'heroe': return '';
      case 'villano': return '';
      case 'neutral': return '';
      default: return '';
    }
  }
  // Método que retorna un icono vacío para el tipo de poder del personaje (anteriormente con emojis)
  getPowerTypeIcon(powerType: string): string {
    switch (powerType) {
      case 'magia': return '';
      case 'tecnologia': return '';
      case 'natural': return '';
      default: return '';
    }
  }

  // Maneja errores de carga de imágenes
  onImageError(event: any) {
    event.target.style.display = 'none';
    if (event.target.parentElement) {
      event.target.parentElement.style.backgroundColor = '#e9ecef';
      event.target.parentElement.innerHTML += '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d; font-size: 14px;">Sin imagen disponible</div>';
    }
  }
}
