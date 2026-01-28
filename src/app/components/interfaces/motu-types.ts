export type TipoEntidad = 'personaje' | 'arma' | 'lugar';
export type TipoCategoria = 'heroe' | 'villano' | 'neutral';
export type TipoPoder = 'magia' | 'tecnologia' | 'natural';
export type TipoFaccion = 'buenos' | 'malos' | 'neutrales';

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
  fechaActualizacion?: Date;      name?: string;
  description?: string;
  imageUrl?: string;
  origin?: string;
  abilities?: string[];
  faction?: TipoFaccion;
  powerType?: TipoPoder;
}

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
  
  // Propiedades alias en inglés para compatibilidad
  realName?: string;
  affiliation?: string;
  weapons?: string[];
  category?: TipoCategoria;
}

export interface Arma extends EntidadBase {
  tipo: 'arma';
  tipoArma: 'espada' | 'baston' | 'escudo' | 'armadura' | 'vehiculo' | 'artefacto';
  portador?: string;
  material?: string;
  encantamientos?: string[];
  tipoDanio?: string;
  alcance?: 'cuerpo_a_cuerpo' | 'distancia' | 'ambos';
  
  weaponType?: string;
  bearer?: string;
}

export interface Lugar extends EntidadBase {
  tipo: 'lugar';
  tipoLugar: 'castillo' | 'planeta' | 'dimension' | 'ciudad' | 'fortaleza' | 'templo' | 'palacio';
  gobernante?: string;
  habitantes?: string[];
  caracteristicasNotables?: string[];
  clima?: string;
  peligros?: string[];
  
  locationType?: string;
  ruler?: string;
}

export type EntidadMOTU = Personaje | Arma | Lugar;

export type Character = Personaje;
export type Weapon = Arma;
export type Location = Lugar;
export type MOTUEntity = EntidadMOTU;

export interface OpcionesFiltro {
  tipo?: TipoEntidad;
  type?: 'character' | 'weapon' | 'location' | 'personaje' | 'arma' | 'lugar';
  faccion?: TipoFaccion;
  faction?: TipoFaccion;
  tipoPoder?: TipoPoder;
  powerType?: TipoPoder;
  categoria?: TipoCategoria;
  category?: TipoCategoria;
  busqueda?: string;
  search?: string;
}

export type FilterOptions = OpcionesFiltro;