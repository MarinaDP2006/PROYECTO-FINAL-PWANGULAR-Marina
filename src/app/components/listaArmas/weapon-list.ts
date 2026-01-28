import { Component, signal, inject, OnInit } from '@angular/core';
import { Arma } from '../interfaces/motu-types';
import { MotuData } from '../servicioDATA/motu-data';

@Component({
  selector: 'app-weapon-list',
  standalone: false,
  templateUrl: './weapon-list.html',
  styleUrl: './weapon-list.css',
})
export class WeaponList implements OnInit {
  private motuData = inject(MotuData);

  weapons = signal<Arma[]>([]);

  ngOnInit() {
    this.loadWeapons();
  }

  private loadWeapons() {
    this.motuData.filtrarEntidades({ tipo: 'arma' }).subscribe((entidades: any[]) => {
      const armas = entidades as Arma[];
      this.weapons.set(armas);
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
