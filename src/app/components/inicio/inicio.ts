import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {

  constructor() {
    console.log('Componente Inicio cargado!');
  }
}
