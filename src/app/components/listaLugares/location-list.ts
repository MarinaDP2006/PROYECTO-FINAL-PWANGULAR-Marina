import { Component, signal, inject, OnInit } from '@angular/core';
import { Lugar } from '../interfaces/motu-types';
import { MotuData } from '../servicioDATA/motu-data';

@Component({
  selector: 'app-location-list',
  standalone: false,
  templateUrl: './location-list.html',
  styleUrl: './location-list.css',
})
export class LocationList implements OnInit {
  private motuData = inject(MotuData);
  locations = signal<Lugar[]>([]);
  ngOnInit() {
    this.loadLocations();
  }
  // Carga la lista de lugares desde el servicio de datos
  private loadLocations() {
    this.motuData.filtrarEntidades({ tipo: 'lugar' }).subscribe((entidades: any[]) => {
      const lugares = entidades as Lugar[];
      this.locations.set(lugares);
    });
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
