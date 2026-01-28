import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Personaje, Arma, Lugar, EntidadMOTU, OpcionesFiltro, TipoEntidad } from '../interfaces/motu-types';

@Injectable({ providedIn: 'root' })
export class MotuData {
  private http = inject(HttpClient);
  private personajesUrl = 'api/personajes';
  private armasUrl = 'api/armas';
  private lugaresUrl = 'api/lugares';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // BehaviorSubjects para notificar cambios
  private personajesSubject = new BehaviorSubject<Personaje[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');

  public personajes$ = this.personajesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor() {
    this.loadPersonajes();
  }

  // MÉTODOS PARA GESTIÓN DE ESTADO
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.errorSubject.next(`Error en ${operation}: ${error.message}`);
      this.loadingSubject.next(false);
      return of(result as T);
    };
  }

  private setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
    if (!loading) {
      setTimeout(() => this.errorSubject.next(''), 3000);
    }
  }

  // MÉTODOS HTTP - PERSONAJES
  getPersonajes(): Observable<Personaje[]> {
    this.setLoading(true);
    return this.http.get<Personaje[]>(this.personajesUrl)
      .pipe(
        tap(personajes => {
          this.personajesSubject.next(personajes);
          this.setLoading(false);
        }),
        catchError(this.handleError<Personaje[]>('getPersonajes', []))
      );
  }

  getPersonaje(id: string): Observable<Personaje> {
    this.setLoading(true);
    const url = `${this.personajesUrl}/${id}`;
    return this.http.get<Personaje>(url)
      .pipe(
        tap(_ => this.setLoading(false)),
        catchError(this.handleError<Personaje>(`getPersonaje id=${id}`))
      );
  }

  addPersonaje(personaje: Personaje): Observable<Personaje> {
    this.setLoading(true);
    return this.http.post<Personaje>(this.personajesUrl, personaje, this.httpOptions)
      .pipe(
        tap((newPersonaje: Personaje) => {
          const current = this.personajesSubject.value;
          this.personajesSubject.next([...current, newPersonaje]);
          this.setLoading(false);
        }),
        catchError(this.handleError<Personaje>('addPersonaje'))
      );
  }

  updatePersonaje(personaje: Personaje): Observable<any> {
    this.setLoading(true);
    return this.http.put(this.personajesUrl, personaje, this.httpOptions)
      .pipe(
        tap(_ => {
          const current = this.personajesSubject.value;
          const index = current.findIndex(p => p.id === personaje.id);
          if (index !== -1) {
            current[index] = personaje;
            this.personajesSubject.next([...current]);
          }
          this.setLoading(false);
        }),
        catchError(this.handleError<any>('updatePersonaje'))
      );
  }

  deletePersonaje(id: string): Observable<Personaje> {
    this.setLoading(true);
    const url = `${this.personajesUrl}/${id}`;
    return this.http.delete<Personaje>(url, this.httpOptions)
      .pipe(
        tap(_ => {
          const current = this.personajesSubject.value;
          this.personajesSubject.next(current.filter(p => p.id !== id));
          this.setLoading(false);
        }),
        catchError(this.handleError<Personaje>('deletePersonaje'))
      );
  }

  // MÉTODOS HTTP - ARMAS
  getArmas(): Observable<Arma[]> {
    this.setLoading(true);
    return this.http.get<Arma[]>(this.armasUrl)
      .pipe(
        tap(_ => this.setLoading(false)),
        catchError(this.handleError<Arma[]>('getArmas', []))
      );
  }

  // MÉTODOS HTTP - LUGARES
  getLugares(): Observable<Lugar[]> {
    this.setLoading(true);
    return this.http.get<Lugar[]>(this.lugaresUrl)
      .pipe(
        tap(_ => this.setLoading(false)),
        catchError(this.handleError<Lugar[]>('getLugares', []))
      );
  }

  // MÉTODOS DE COMPATIBILIDAD (mantienen la interfaz anterior)
  private loadPersonajes() {
    this.getPersonajes().subscribe();
  }

  filtrarEntidades(opciones?: OpcionesFiltro): EntidadMOTU[] {
    if (opciones?.tipo === 'personaje') {
      return this.personajesSubject.value;
    }
    // Para armas y lugares, mantener comportamiento síncrono por ahora
    return [];
  }

  obtenerEntidadPorId(id: string): EntidadMOTU | undefined {
    return this.personajesSubject.value.find(p => p.id === id);
  }

  agregarPersonaje(personaje: Personaje): void {
    this.addPersonaje(personaje).subscribe();
  }

  actualizarPersonaje(personaje: Personaje): void {
    this.updatePersonaje(personaje).subscribe();
  }

  eliminarEntidad(id: string): void {
    this.deletePersonaje(id).subscribe();
  }
}
