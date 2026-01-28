import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Personaje, Arma, Lugar } from './components/interfaces/motu-types';

// Datos guardados en InMemoryDataService API
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const personajes: Personaje[] = [
      {
        id: '1',
        nombre: 'He-Man',
        descripcion: 'El héroe de Eternia, príncipe Adam.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'heroe',
        faccion: 'buenos',
        tipoPoder: 'natural',
        origen: 'Eternia'
      },
      {
        id: '2',
        nombre: 'Skeletor',
        descripcion: 'Señor de la Destrucción y tío del príncipe Adam, guerrero de Eternia como He-Man',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'villano',
        faccion: 'malos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '3',
        nombre: 'Teela',
        descripcion: 'Capitana de la Guardia Real y nueva hechiera de Eternia.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'heroe',
        faccion: 'buenos',
        tipoPoder: 'natural',
        origen: 'Eternia'
      },
      {
        id: '4',
        nombre: 'Evil-Lyn',
        descripcion: 'Hechicera malvada y lugarteniente de Skeletor. Busca la redención.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'villano',
        faccion: 'malos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '5',
        nombre: 'Man-At-Arms',
        descripcion: 'Maestro de armas e inventor del reino. Padre de Teela.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'heroe',
        faccion: 'buenos',
        tipoPoder: 'tecnologia',
        origen: 'Eternia'
      },
      {
        id: '6',
        nombre: 'Orko',
        descripcion: 'Duende mágico de Trolla, amigo fiel de He-Man y maestro de la magia.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'heroe',
        faccion: 'buenos',
        tipoPoder: 'magia',
        origen: 'Trolla'
      },
      {
        id: '7',
        nombre: 'Battle Cat',
        descripcion: 'Compañero de He-Man. Se transforma en Battle Cat por la espada. Leal a su maestro, es transporte y una poderosa bestia.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'heroe',
        faccion: 'buenos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '8',
        nombre: 'Beast Man',
        descripcion: 'Guerrero salvaje con poderes sobre las bestias. Lugarteniente de Skeletor.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'villano',
        faccion: 'malos',
        tipoPoder: 'natural',
        origen: 'Eternia'
      },
      {
        id: '9',
        nombre: 'Trap Jaw',
        descripcion: 'Cyborg malvado con mandíbula mecánica y múltiples armas integradas.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'villano',
        faccion: 'malos',
        tipoPoder: 'tecnologia',
        origen: 'Eternia'
      },
      {
        id: '10',
        nombre: 'Tri-Klops',
        descripcion: 'Guerrero de tres ojos con habilidades de visión especiales.',
        urlImagen: '',
        tipo: 'personaje',
        categoria: 'villano',
        faccion: 'malos',
        tipoPoder: 'tecnologia',
        origen: 'Eternia'
      }
    ];
    const armas: Arma[] = [
      {
        id: '11',
        nombre: 'Espada del Poder',
        descripcion: 'La espada que da poder a He-Man.',
        urlImagen: '',
        tipo: 'arma',
        tipoArma: 'espada',
        faccion: 'buenos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '12',
        nombre: 'Bastón de Havoc',
        descripcion: 'Bastón mágico de Skeletor.',
        urlImagen: '',
        tipo: 'arma',
        tipoArma: 'baston',
        faccion: 'malos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '13',
        nombre: 'Escudo de Eternia',
        descripcion: 'Escudo protector del reino de Eternia.',
        urlImagen: '',
        tipo: 'arma',
        tipoArma: 'escudo',
        faccion: 'buenos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      }
    ];
    const lugares: Lugar[] = [
      {
        id: '14',
        nombre: 'Castillo Grayskull',
        descripcion: 'Fortaleza mística, fuente del poder de He-Man.',
        urlImagen: '',
        tipo: 'lugar',
        tipoLugar: 'castillo',
        faccion: 'buenos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '15',
        nombre: 'Montaña Serpiente',
        descripcion: 'Guarida de Skeletor.',
        urlImagen: '',
        tipo: 'lugar',
        tipoLugar: 'fortaleza',
        faccion: 'malos',
        tipoPoder: 'magia',
        origen: 'Eternia'
      },
      {
        id: '16',
        nombre: 'Palacio Real',
        descripcion: 'Sede del gobierno de Eternia.',
        urlImagen: '',
        tipo: 'lugar',
        tipoLugar: 'palacio',
        faccion: 'buenos',
        tipoPoder: 'tecnologia',
        origen: 'Eternia'
      }
    ];
    return {personajes, armas, lugares};
  }

  // Genera IDs únicos para nuevos elementos
  genId<T extends {id: string}>(collection: T[]): string {
    return collection.length > 0 ? String(Math.max(...collection.map(item => parseInt(item.id))) + 1): '1';
  }
}
