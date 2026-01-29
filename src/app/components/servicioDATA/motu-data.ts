import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Personaje, Arma, Lugar, EntidadMOTU, OpcionesFiltro, TipoEntidad } from '../interfaces/motu-types';

@Injectable({ providedIn: 'root' })
export class MotuData {

  // CONFIGURACIÓN HTTP
  private http = inject(HttpClient);
  private readonly personajesUrl = 'api/personajes';
  private readonly armasUrl = 'api/armas';
  private readonly lugaresUrl = 'api/lugares';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

 // BehaviorSubjects para manejo de estado global
  private personajesSubject = new BehaviorSubject<Personaje[]>([]);
  private armasSubject = new BehaviorSubject<Arma[]>([]);
  private lugaresSubject = new BehaviorSubject<Lugar[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');
  public readonly personajes$ = this.personajesSubject.asObservable();
  public readonly armas$ = this.armasSubject.asObservable();
  public readonly lugares$ = this.lugaresSubject.asObservable();
  public readonly loading$ = this.loadingSubject.asObservable();
  public readonly error$ = this.errorSubject.asObservable();

  constructor() {
    console.log('// Inicializando servicio MOTU Data...');
    this.initializeData();
  }


  // === GESTIÓN DE ERRORES Y ESTADO HTT. Error Handling para capturar y loggear errores de red
  private handleError<T>(operation = 'operación desconocida', result?: T) {
    return (error: any): Observable<T> => {
      // Log detallado del error para debugging
      console.error(`Error en ${operation}:`, {
        message: error.message,
        status: error.status,
        url: error.url,
        timestamp: new Date().toISOString()
      });
      // Actualizar estado global de error con mensaje user-friendly
      const userMessage = this.getUserFriendlyErrorMessage(error, operation);
      this.errorSubject.next(userMessage);
      // Asegurar que loading se desactive
      this.loadingSubject.next(false);
      // Darme valor por defecto para permitir que la app continúe
      return of(result as T);
    };
  }

  // Convierte errores técnicos en mensajes comprensibles para el usuario
  private getUserFriendlyErrorMessage(error: any, operation: string): string {
    if (error.status === 0) {
      return 'Sin conexión a internet. Verifica tu conectividad.';
    }
    if (error.status === 404) {
      return `// No se encontró el recurso solicitado en ${operation}.`;
    }
    if (error.status === 500) {
      return 'Error del servidor. Intenta nuevamente en unos minutos.';
    }
    return `Error en ${operation}: ${error.message || 'Error desconocido'}`;
  }

  // Gestiona el estado de carga global
  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
    // Auto-limpiar errores cuando termine una operación exitosa
    if (!loading) {
      // Para que el usuario pueda leer el mensaje de error si existe
      setTimeout(() => {
        if (!this.loadingSubject.value) { // Solo limpiar si no hay otra operación en curso
          this.errorSubject.next('');
        }
      }, 3000);
    }
  }

  private initializeData(): void {
    console.log('// Cargando datos iniciales...');
    // Cargar datos en paralelo para mejor performance
    Promise.all([
      this.loadPersonajes(),
      this.loadArmas(),
      this.loadLugares()
    ]).then(() => {
      console.log('Datos iniciales cargados exitosamente');
    }).catch(error => {
      console.error('Error cargando datos iniciales:', error);
    });
  }

  // === MÉTODOS HTTP CRUD - PERSONAJES ===
  getPersonajes(): Observable<Personaje[]> {
    this.setLoading(true);
    return this.http.get<Personaje[]>(this.personajesUrl)
      .pipe(
        // tap() para efectos secundarios sin modificar el flujo
        tap(personajes => {
          console.log(`Obtenidos ${personajes.length} personajes`);
          // Actualizar cache local para acceso síncrono
          this.personajesSubject.next(personajes);
          this.setLoading(false);
        }),
        // Manejo de errores centralizado
        catchError(this.handleError<Personaje[]>('getPersonajes', []))
      );
  }
  getPersonaje(id: string): Observable<Personaje> {
    // Verificar cache local primero
    const cached = this.personajesSubject.value.find(p => p.id === id);
    if (cached) {
      console.log(`// Personaje ${id} obtenido desde cache`);
      return of(cached);
    }

    // Si no está en cache, realiza petición HTTP
    this.setLoading(true);
    const url = `${this.personajesUrl}/${id}`;
    return this.http.get<Personaje>(url)
      .pipe(
        tap(personaje => {
          console.log(`Personaje ${personaje.nombre} obtenido desde API`);
          this.setLoading(false);
        }),
        catchError(this.handleError<Personaje>(`getPersonaje id=${id}`))
      );
  }

  addPersonaje(personaje: Personaje): Observable<Personaje> {
    this.setLoading(true);
    return this.http.post<Personaje>(this.personajesUrl, personaje, this.httpOptions)
      .pipe(
        tap((newPersonaje: Personaje) => {
          console.log(`Personaje ${newPersonaje.nombre} creado con ID ${newPersonaje.id}`);
          // Actualizar cache local inmediatamente
          const currentList = this.personajesSubject.value;
          this.personajesSubject.next([...currentList, newPersonaje]);

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
          console.log(`Personaje ${personaje.nombre} actualizado`);
          // Actualizar cache local preservando el orden
          const currentList = this.personajesSubject.value;
          const index = currentList.findIndex(p => p.id === personaje.id);
          if (index !== -1) {
            // Crear nueva lista con el elemento actualizado
            const updatedList = [...currentList];
            updatedList[index] = personaje;
            this.personajesSubject.next(updatedList);
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
        tap(deletedPersonaje => {
          console.log(`Personaje con ID ${id} eliminado`);
          // Filtrar elemento eliminado del cache local
          const currentList = this.personajesSubject.value;
          const filteredList = currentList.filter(p => p.id !== id);
          this.personajesSubject.next(filteredList);
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
        tap(armas => {
          console.log(`// Obtenidas ${armas.length} armas`);
          this.armasSubject.next(armas);
          this.setLoading(false);
        }),
        catchError(this.handleError<Arma[]>('getArmas', []))
      );
  }

  // MÉTODOS HTTP - LUGARES
  getLugares(): Observable<Lugar[]> {
    this.setLoading(true);
    return this.http.get<Lugar[]>(this.lugaresUrl)
      .pipe(
        tap(lugares => {
          console.log(`🏰 Obtenidos ${lugares.length} lugares`);
          this.lugaresSubject.next(lugares);
          this.setLoading(false);
        }),
        catchError(this.handleError<Lugar[]>('getLugares', []))
      );
  }

  // MÉTODOS DE CARGA INICIAL
  private async loadPersonajes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getPersonajes().subscribe({
        next: personajes => {
          console.log(`👥 ${personajes.length} personajes cargados en cache`);
          resolve();
        },
        error: error => reject(error)
      });
    });
  }

 private async loadArmas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getArmas().subscribe({
        next: armas => {
          console.log(`// ${armas.length} armas cargadas en cache`);
          resolve();
        },
        error: error => reject(error)
      });
    });
  }

private async loadLugares(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getLugares().subscribe({
        next: lugares => {
          console.log(`🏰 ${lugares.length} lugares cargados en cache`);
          resolve();
        },
        error: error => reject(error)
      });
    });
  }


  //  MÉTODOS DE UTILIDAD Y COMPATIBILIDAD
  filtrarEntidades(opciones?: OpcionesFiltro): Observable<EntidadMOTU[]> {
    if (opciones?.tipo === 'personaje') {
      return this.personajes$;
    }
    if (opciones?.tipo === 'arma') {
      return this.armas$;
    }
    if (opciones?.tipo === 'lugar') {
      return this.lugares$;
    }

    // Combinar todas las entidades si no se especifica tipo
    return of([
      ...this.personajesSubject.value,
      ...this.armasSubject.value,
      ...this.lugaresSubject.value
    ]);
  }

  // Búsqueda de entidad por ID
  obtenerEntidadPorId(id: string): EntidadMOTU | undefined {
    // Buscar en todas las colecciones
    const personaje = this.personajesSubject.value.find(p => p.id === id);
    if (personaje) return personaje;
    const arma = this.armasSubject.value.find(a => a.id === id);
    if (arma) return arma;
    const lugar = this.lugaresSubject.value.find(l => l.id === id);
    return lugar;
  }

  // MÉTODOS DE COMPATIBILIDAD (ERROR)
  agregarPersonaje(personaje: Personaje): void {
    console.warn('// WARNING: agregarPersonaje() está deprecated. Usar addPersonaje() directamente.');
    this.addPersonaje(personaje).subscribe();
  }

  actualizarPersonaje(personaje: Personaje): void {
    console.warn('// WARNING: actualizarPersonaje() está deprecated. Usar updatePersonaje() directamente.');
    this.updatePersonaje(personaje).subscribe();
  }
  eliminarEntidad(id: string): void {
    console.warn('// WARNING: eliminarEntidad() está deprecated. Usar deletePersonaje() directamente.');
    this.deletePersonaje(id).subscribe();
  }
}
