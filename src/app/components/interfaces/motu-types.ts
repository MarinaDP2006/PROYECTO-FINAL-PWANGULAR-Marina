export type TipoEntidad = 'personaje' | 'arma' | 'lugar';
export type TipoCategoria = 'heroe' | 'villano' | 'neutral';
export type TipoPoder = 'magia' | 'tecnologia' | 'natural';
export type TipoFaccion = 'buenos' | 'malos' | 'neutrales';


// Interfaz base para todas las entidades del universo MOTU
export interface EntidadBase {
  id: string;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  tipo: TipoEntidad;
  faccion: TipoFaccion;
  tipoPoder: TipoPoder;
  origen?: string;
  habilidades?: string[];
  debilidades?: string[];
  fechaCreacion?: Date;
  fechaActualizacion?: Date;

  // Alias en inglés
  name?: string;
  description?: string;
  imageUrl?: string;
  origin?: string;
  abilities?: string[];
  faction?: TipoFaccion;
  powerType?: TipoPoder;
}

// Interfaz para personajes del universo MOTU
export interface Personaje extends EntidadBase {
  tipo: 'personaje';
  categoria: TipoCategoria;
  nombreReal?: string;
  ocupacion?: string;
  afiliacion?: string;
  lugarResidencia?: string;
  armas?: string[];
  aliados?: string[];
  enemigos?: string[];

  // Alias en inglés
  realName?: string;
  affiliation?: string;
  weapons?: string[];
  category?: TipoCategoria;
}

// Interfaz para armas
export interface Arma extends EntidadBase {
  tipo: 'arma';
  tipoArma: 'espada' | 'baston' | 'escudo' | 'armadura' | 'vehiculo' | 'artefacto';
  portador?: string;
  material?: string;
  encantamientos?: string[];
  tipoDanio?: string;
  alcance?: 'cuerpo_a_cuerpo' | 'distancia' | 'ambos';

  // Alias en inglés
  weaponType?: string;
  bearer?: string;
}

// Interfaz para lugares
export interface Lugar extends EntidadBase {
  tipo: 'lugar';
  tipoLugar: 'castillo' | 'planeta' | 'dimension' | 'ciudad' | 'fortaleza' | 'templo' | 'palacio';
  gobernante?: string;
  habitantes?: string[];
  caracteristicasNotables?: string[];
  clima?: string;
  peligros?: string[];

  // Alias en inglés
  locationType?: string;
  ruler?: string;
}

// Union type para cualquier entidad del universo MOTU
export type EntidadMOTU = Personaje | Arma | Lugar;

// Alias en inglés para compatibilidad
export type Character = Personaje;
export type Weapon = Arma;
export type Location = Lugar;
export type MOTUEntity = EntidadMOTU;

// Opciones de filtrado para búsquedas y consultas
export interface OpcionesFiltro {
  tipo?: TipoEntidad;
  faccion?: TipoFaccion;
  tipoPoder?: TipoPoder;
  categoria?: TipoCategoria;
  busqueda?: string;

  // Alias en inglés
  type?: 'character' | 'weapon' | 'location' | 'personaje' | 'arma' | 'lugar';
  faction?: TipoFaccion;
  powerType?: TipoPoder;
  category?: TipoCategoria;
  search?: string;
}

// Alias en inglés para opciones de filtrado
export type FilterOptions = OpcionesFiltro;
