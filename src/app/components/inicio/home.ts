import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personaje, Arma, Lugar } from '../interfaces/motu-types';
import { MotuData } from '../servicioDATA/motu-data';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private motuData = inject(MotuData);
  private router = inject(Router);

  allEntities = signal<(Personaje | Arma | Lugar)[]>([]);

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loadAllEntities();
  }

  // Carga todas las entidades (personajes, armas, lugares) y las ordena alfabéticamente
  private loadAllEntities() {
    combineLatest([
      this.motuData.personajes$,
      this.motuData.armas$,
      this.motuData.lugares$
    ]).subscribe(([personajes, armas, lugares]) => {
      const todasEntidades = [...personajes, ...armas, ...lugares];
      const entidadesOrdenadas = todasEntidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.allEntities.set(entidadesOrdenadas);
    });
  }

  // Determina el tipo de entidad para mostrar el estilo apropiado
  getEntityType(entity: Personaje | Arma | Lugar): string {
    return entity.tipo;
  }

  // Devuelve una etiqueta legible para el tipo de entidad
  getEntityTypeLabel(entity: Personaje | Arma | Lugar): string {
    switch (entity.tipo) {
      case 'personaje':
        return 'Personaje';
      case 'arma':
        return 'Arma';
      case 'lugar':
        return 'Lugar';
      default:
        return 'Entidad';
    }
  }

  // Navega a la página de lista correspondiente según el tipo de entidad
  viewDetails(entity: Personaje | Arma | Lugar) {
    switch (entity.tipo) {
      case 'personaje':
        this.router.navigate(['/characters']);
        break;
      case 'arma':
        this.router.navigate(['/weapons']);
        break;
      case 'lugar':
        this.router.navigate(['/locations']);
        break;
    }
  }

  // Maneja errores de carga de imágenes
  onImageError(event: any) {
    // Oculta la imagen que falló y muestra un placeholder
    event.target.style.display = 'none';
    if (event.target.parentElement) {
      event.target.parentElement.style.backgroundColor = '#e9ecef';
      event.target.parentElement.innerHTML += '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d;">Sin imagen disponible</div>';
    }
  }
}
