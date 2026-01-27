// Tipos de entidad en el universo MOTU
export type TipoEntidad = 'personaje' | 'arma' | 'lugar';
// Categorías morales de los personajes
export type TipoCategoria = 'heroe' | 'villano' | 'neutral';
// Tipos de poder que poseen las entidades
export type TipoPoder = 'magia' | 'tecnologia' | 'natural';
// Facciones del universo MOTU
export type TipoFaccion = 'heroica' | 'malvada' | 'independiente';

// Interfaz base para todas las entidades del universo MOTU
export interface EntidadBase {
  id: string;                    // Identificador único
  nombre: string;                // Nombre de la entidad
  descripcion: string;           // Descripción detallada
  urlImagen: string;            // URL de la imagen representativa
  tipo: TipoEntidad;            // Tipo de entidad (personaje/arma/lugar)
  faccion: TipoFaccion;         // Facción a la que pertenece
  tipoPoder: TipoPoder;         // Tipo de poder que posee
  origen?: string;              // Lugar o dimensión de origen
  habilidades?: string[];       // Lista de habilidades especiales
  debilidades?: string[];       // Lista de puntos débiles
  fechaCreacion?: Date;         // Fecha de creación del registro
  fechaActualizacion?: Date;    // Última fecha de modificación
  
  // Propiedades alias en inglés para compatibilidad
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
  categoria: TipoCategoria;     // Héroe, villano o neutral
  nombreReal?: string;          // Nombre real del personaje
  ocupacion?: string;           // Profesión o rol principal
  afiliacion?: string;          // Organización a la que pertenece
  lugarResidencia?: string;     // Lugar donde vive habitualmente
  armas?: string[];             // Armas que utiliza
  aliados?: string[];           // Lista de aliados principales
  enemigos?: string[];          // Lista de enemigos principales
  
  // Propiedades alias en inglés para compatibilidad
  realName?: string;
  affiliation?: string;
  weapons?: string[];
  category?: TipoCategoria;
}

// Interfaz para armas del universo MOTU
export interface Arma extends EntidadBase {
  tipo: 'arma';
  tipoArma: 'espada' | 'baston' | 'escudo' | 'armadura' | 'vehiculo' | 'artefacto';
  portador?: string;            // Quien empuña el arma
  material?: string;            // Material de construcción
  encantamientos?: string[];    // Poderes mágicos del arma
  tipoDanio?: string;          // Tipo de daño que inflige
  alcance?: 'cuerpo_a_cuerpo' | 'distancia' | 'ambos'; // Alcance de combate
  
  // Propiedades alias en inglés para compatibilidad
  weaponType?: string;
  bearer?: string;
}

// Interfaz para lugares del universo MOTU
export interface Lugar extends EntidadBase {
  tipo: 'lugar';
  tipoLugar: 'castillo' | 'planeta' | 'dimension' | 'ciudad' | 'fortaleza' | 'templo' | 'palacio';
  gobernante?: string;          // Quien gobierna el lugar
  habitantes?: string[];        // Principales habitantes
  caracteristicasNotables?: string[]; // Elementos distintivos del lugar
  clima?: string;               // Condiciones climáticas
  peligros?: string[];          // Amenazas del lugar
  
  // Propiedades alias en inglés para compatibilidad
  locationType?: string;
  ruler?: string;
}

// Tipo unión para todas las entidades del universo MOTU
export type EntidadMOTU = Personaje | Arma | Lugar;

// Aliases en inglés para compatibilidad con componentes existentes
export type Character = Personaje;
export type Weapon = Arma;
export type Location = Lugar;
export type MOTUEntity = EntidadMOTU;

// Opciones de filtrado para buscar entidades
export interface OpcionesFiltro {
  tipo?: TipoEntidad;           // Filtrar por tipo de entidad
  type?: 'character' | 'weapon' | 'location' | 'personaje' | 'arma' | 'lugar'; // Alias en inglés
  faccion?: TipoFaccion;        // Filtrar por facción
  faction?: TipoFaccion;        // Alias en inglés
  tipoPoder?: TipoPoder;        // Filtrar por tipo de poder
  powerType?: TipoPoder;        // Alias en inglés
  categoria?: TipoCategoria;    // Filtrar por categoría (solo personajes)
  category?: TipoCategoria;     // Alias en inglés
  busqueda?: string;            // Búsqueda por texto libre
  search?: string;              // Alias en inglés
}

// Alias en inglés para las opciones de filtro
export type FilterOptions = OpcionesFiltro;