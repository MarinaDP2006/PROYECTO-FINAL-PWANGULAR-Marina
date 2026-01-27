import { Injectable, signal } from '@angular/core';
import { EntidadMOTU, Personaje, Arma, Lugar, TipoEntidad, OpcionesFiltro } from '../interfaces/motu-types';

@Injectable({
  providedIn: 'root',
})
export class MotuData {
  private readonly CLAVE_ALMACENAMIENTO = 'universo-motu-datos';
  
  // Señales reactivas para los diferentes tipos de entidades
  personajes = signal<Personaje[]>([]);
  armas = signal<Arma[]>([]);
  lugares = signal<Lugar[]>([]);
  todasEntidades = signal<EntidadMOTU[]>([]);
  
  constructor() {
    this.cargarDatos();
    this.inicializarDatosPorDefecto();
  }

  // Carga los datos guardados desde localStorage. Si no hay datos guardados, inicializa con arrays vacíos
  private cargarDatos(): void {
    const datosGuardados = localStorage.getItem(this.CLAVE_ALMACENAMIENTO);
    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        this.personajes.set(datos.personajes || []);
        this.armas.set(datos.armas || []);
        this.lugares.set(datos.lugares || []);
        this.actualizarTodasEntidades();
      } catch (error) {
        console.error('Error al cargar datos desde localStorage:', error);
      }
    }
  }

  // Guarda todos los datos actuales en localStorage
  private guardarDatos(): void {
    const datos = {
      personajes: this.personajes(),
      armas: this.armas(),
      lugares: this.lugares()
    };
    localStorage.setItem(this.CLAVE_ALMACENAMIENTO, JSON.stringify(datos));
  }

  // Actualiza el array unificado de todas las entidades. Se ejecuta cada vez que se modifican los datos
  private actualizarTodasEntidades(): void {
    const todas = [...this.personajes(), ...this.armas(), ...this.lugares()];
    this.todasEntidades.set(todas);
  }

  // CRUD - Métodos para gestionar entidades
  agregarEntidad(entidad: EntidadMOTU): void {
    const nuevaEntidad = { 
      ...entidad, 
      id: this.generarId(), 
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    switch (entidad.tipo) {
      case 'personaje':
        this.personajes.update(personajes => [...personajes, nuevaEntidad as Personaje]);
        break;
      case 'arma':
        this.armas.update(armas => [...armas, nuevaEntidad as Arma]);
        break;
      case 'lugar':
        this.lugares.update(lugares => [...lugares, nuevaEntidad as Lugar]);
        break;
    }
    this.actualizarTodasEntidades();
    this.guardarDatos();
  }

  actualizarEntidad(id: string, updates: Partial<EntidadMOTU>): void {
    const updateFn = (entidades: EntidadMOTU[]) => 
      entidades.map(entidad => 
        entidad.id === id ? { ...entidad, ...updates, fechaActualizacion: new Date() } : entidad
      );

    this.personajes.update(personajes => updateFn(personajes) as Personaje[]);
    this.armas.update(armas => updateFn(armas) as Arma[]);
    this.lugares.update(lugares => updateFn(lugares) as Lugar[]);
    this.actualizarTodasEntidades();
    this.guardarDatos();
  }

  eliminarEntidad(id: string): void {
    this.personajes.update(personajes => personajes.filter(p => p.id !== id));
    this.armas.update(armas => armas.filter(a => a.id !== id));
    this.lugares.update(lugares => lugares.filter(l => l.id !== id));
    this.actualizarTodasEntidades();
    this.guardarDatos();
  }

  obtenerEntidadPorId(id: string): EntidadMOTU | undefined {
    return this.todasEntidades().find(entidad => entidad.id === id);
  }

  // Filtra las entidades según los criterios especificados. Retorna array de entidades que cumplen los criterios
  filtrarEntidades(filtros: OpcionesFiltro): EntidadMOTU[] {
    return this.todasEntidades().filter(entidad => {
      if (filtros.tipo && entidad.tipo !== filtros.tipo) return false;
      if (filtros.faccion && entidad.faccion !== filtros.faccion) return false;
      if (filtros.tipoPoder && entidad.tipoPoder !== filtros.tipoPoder) return false;
      if (filtros.categoria && 'categoria' in entidad && entidad.categoria !== filtros.categoria) return false;
      if (filtros.busqueda) {
        const busquedaMinuscula = filtros.busqueda.toLowerCase();
        return entidad.nombre.toLowerCase().includes(busquedaMinuscula) ||
               entidad.descripcion.toLowerCase().includes(busquedaMinuscula);
      }
      return true;
    });
  }

  // Genera un identificador único para nuevas entidades
  private generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private inicializarDatosPorDefecto(): void {
    if (this.todasEntidades().length === 0) {
      this.agregarDatosIniciales();
    }
  }

  // Añade los datos iniciales con URLs de imágenes de alta calidad
  private agregarDatosIniciales(): void {
    // PERSONAJES PRINCIPALES
    const heMan: Personaje = {
      id: '', nombre: 'He-Man', tipo: 'personaje', categoria: 'heroe', faccion: 'heroica', tipoPoder: 'magia',
      nombreReal: 'Príncipe Adam', descripcion: 'El héroe más poderoso del universo, protector de Eternia y defensor del Castillo de Grayskull',
      urlImagen: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a8b2a0a-c5c0-4b0e-b6b7-8f0b7d2f3a4b/d8g9h2i-3j4k5l6m-7n8o-9p0q-1r2s-3t4u5v6w7x8y.png', 
      origen: 'Eternia', afiliacion: 'Palacio Real de Eternia',
      habilidades: ['Fuerza sobrehumana', 'Velocidad superior', 'Resistencia ilimitada', 'Conexión con el poder de Grayskull'],
      armas: ['Espada del Poder', 'Escudo de Defensa'], aliados: ['She-Ra', 'Teela', 'Man-At-Arms', 'Orko'],
      enemigos: ['Skeletor', 'Beast Man', 'Evil-Lyn', 'Trap Jaw']
    };

    const skeletor: Personaje = {
      id: '', nombre: 'Skeletor', tipo: 'personaje', categoria: 'villano', faccion: 'malvada', tipoPoder: 'magia',
      descripcion: 'Señor de la destrucción y la oscuridad, archienemigo de He-Man que busca conquistar Eternia',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/e/e8/Skeletor_2002.jpg', origen: 'Dimensión Infinita',
      habilidades: ['Magia oscura', 'Telequinesis', 'Rayos de energía destructiva', 'Invocación de criaturas'],
      armas: ['Báculo del Caos'], aliados: ['Evil-Lyn', 'Beast Man', 'Mer-Man', 'Trap Jaw'],
      enemigos: ['He-Man', 'Sorceress', 'Man-At-Arms', 'Teela']
    };

    const teela: Personaje = {
      id: '', nombre: 'Teela', tipo: 'personaje', categoria: 'heroe', faccion: 'heroica', tipoPoder: 'natural',
      descripcion: 'Valiente guerrera y capitán de la guardia real, hábil en combate y estrategia militar',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/c/c4/Teela_Filmation.png', origen: 'Eternia',
      habilidades: ['Maestría en combate', 'Estrategia militar', 'Liderazgo', 'Agilidad extraordinaria'],
      armas: ['Báculo de Combate', 'Escudo de Guerra'], aliados: ['He-Man', 'Man-At-Arms', 'Sorceress']
    };

    const beastMan: Personaje = {
      id: '', nombre: 'Beast Man', tipo: 'personaje', categoria: 'villano', faccion: 'malvada', tipoPoder: 'natural',
      descripcion: 'Maestro de las bestias salvajes con habilidades primitivas pero poderosas',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/8/8a/Beast_Man_2002.jpg', origen: 'Eternia',
      habilidades: ['Control de animales', 'Fuerza bruta', 'Supervivencia en naturaleza', 'Rugido hipnótico'],
      armas: ['Látigo de Control'], aliados: ['Skeletor', 'Evil-Lyn', 'Mer-Man'], enemigos: ['He-Man', 'Battle Cat']
    };

    const evilLyn: Personaje = {
      id: '', nombre: 'Evil-Lyn', tipo: 'personaje', categoria: 'villano', faccion: 'malvada', tipoPoder: 'magia',
      descripcion: 'Poderosa hechicera y lugarteniente de Skeletor, maestra en artes mágicas oscuras',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/f/f0/Evil-Lyn_2002.jpg', origen: 'Eternia',
      habilidades: ['Hechicería avanzada', 'Teletransportación', 'Ilusión', 'Control mental'],
      armas: ['Báculo Mágico'], aliados: ['Skeletor', 'Beast Man', 'Trap Jaw']
    };

    const manAtArms: Personaje = {
      id: '', nombre: 'Man-At-Arms', tipo: 'personaje', categoria: 'heroe', faccion: 'heroica', tipoPoder: 'tecnologia',
      nombreReal: 'Duncan', descripcion: 'Maestro de armas del reino y genio inventor, mentor y figura paterna de Adam',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/d/d8/Man-At-Arms_2002.jpg', origen: 'Eternia', 
      ocupacion: 'Maestro de Armas Real',
      habilidades: ['Maestría en todas las armas', 'Genio inventor', 'Estrategia militar', 'Ingeniería avanzada'],
      armas: ['Maza de Combate', 'Battle Axe'], aliados: ['He-Man', 'Teela', 'Sorceress']
    };

    const orko: Personaje = {
      id: '', nombre: 'Orko', tipo: 'personaje', categoria: 'heroe', faccion: 'heroica', tipoPoder: 'magia',
      descripcion: 'Mago cómico de Trolla, leal amigo de He-Man a pesar de sus hechizos fallidos',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/3/36/Orko_2002.jpg', origen: 'Trolla',
      habilidades: ['Magia (impredecible)', 'Levitación', 'Teletransportación', 'Humor'],
      aliados: ['He-Man', 'Teela', 'Man-At-Arms'], armas: ['Magia de Trolla']
    };

    const battleCat: Personaje = {
      id: '', nombre: 'Battle Cat', tipo: 'personaje', categoria: 'heroe', faccion: 'heroica', tipoPoder: 'natural',
      nombreReal: 'Cringer', descripcion: 'Tigre de combate verde, fiel compañero de He-Man transformado por el poder de Grayskull',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/5/56/Battle_Cat_2002.jpg', origen: 'Eternia',
      habilidades: ['Fuerza felina sobrehumana', 'Velocidad', 'Agilidad', 'Lealtad inquebrantable'],
      aliados: ['He-Man', 'Teela'], armas: ['Garras y colmillos', 'Armadura de combate']
    };

    const merMan: Personaje = {
      id: '', nombre: 'Mer-Man', tipo: 'personaje', categoria: 'villano', faccion: 'malvada', tipoPoder: 'natural',
      descripcion: 'Señor de los océanos de Eternia, maestro de las criaturas marinas',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/7/7e/Mer-Man_2002.jpg', origen: 'Océanos de Eternia',
      habilidades: ['Control de vida marina', 'Respiración acuática', 'Natación sobrehumana', 'Telepatía marina'],
      armas: ['Tridente de los Mares'], aliados: ['Skeletor', 'Beast Man'], lugarResidencia: 'Reino Submarino'
    };

    const trapJaw: Personaje = {
      id: '', nombre: 'Trap Jaw', tipo: 'personaje', categoria: 'villano', faccion: 'malvada', tipoPoder: 'tecnologia',
      descripcion: 'Cyborg villano con mandíbula mecánica y brazos intercambiables llenos de armas',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/9/95/Trap_Jaw_2002.jpg', origen: 'Eternia',
      habilidades: ['Fuerza cibernética', 'Arsenal de armas incorporadas', 'Mandíbula trituradora', 'Resistencia mecánica'],
      armas: ['Brazo-Cañón', 'Mandíbula Mecánica'], aliados: ['Skeletor', 'Evil-Lyn']
    };

    // ARMAS LEGENDARIAS
    const espadaPoder: Arma = {
      id: '', nombre: 'Espada del Poder', tipo: 'arma', tipoArma: 'espada', faccion: 'heroica', tipoPoder: 'magia',
      descripcion: 'Espada mágica legendaria que transforma al Príncipe Adam en He-Man, fuente del poder de Grayskull',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/1/1e/Power_Sword_2002.jpg', 
      portador: 'He-Man', material: 'Metal mágico de Eternia',
      alcance: 'cuerpo_a_cuerpo', encantamientos: ['Transformación', 'Canalizar poder de Grayskull', 'Protección mágica'],
      habilidades: ['Corta cualquier material', 'Refleja ataques mágicos', 'Comunica con el Castillo de Grayskull']
    };

    const baculoCaos: Arma = {
      id: '', nombre: 'Havoc Staff', tipo: 'arma', tipoArma: 'baston', faccion: 'malvada', tipoPoder: 'magia',
      descripcion: 'Báculo del mal de Skeletor coronado con una calavera, canaliza poderes oscuros y destructivos',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/4/4a/Havoc_Staff_2002.jpg', 
      portador: 'Skeletor', material: 'Metal oscuro encantado',
      alcance: 'ambos', encantamientos: ['Rayos de energía', 'Control mental', 'Invocación de criaturas'],
      habilidades: ['Dispara rayos destructivos', 'Abre portales dimensionales', 'Amplifica poderes mágicos']
    };

    const escudoHeMan: Arma = {
      id: '', nombre: 'Escudo de He-Man', tipo: 'arma', tipoArma: 'escudo', faccion: 'heroica', tipoPoder: 'magia',
      descripcion: 'Escudo mágico con el símbolo del poder, complemento perfecto de la Espada del Poder',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/8/8c/He-Man_Shield_2002.jpg',
      portador: 'He-Man', material: 'Metal mágico reforzado',
      alcance: 'cuerpo_a_cuerpo', encantamientos: ['Deflección mágica', 'Absorción de energía', 'Protección divina'],
      habilidades: ['Deflecta rayos láser', 'Absorbe ataques mágicos', 'Escudo invulnerable']
    };

    const battleAxe: Arma = {
      id: '', nombre: 'Battle Axe', tipo: 'arma', tipoArma: 'artefacto', faccion: 'heroica', tipoPoder: 'tecnologia',
      descripcion: 'Hacha de combate tecnológicamente avanzada de Man-At-Arms, diseñada para el combate pesado',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/6/6b/Man-At-Arms_Axe_2002.jpg',
      portador: 'Man-At-Arms', material: 'Aleación tecnológica de Eternia',
      alcance: 'cuerpo_a_cuerpo', tipoDanio: 'Corte pesado',
      habilidades: ['Corte de alta precisión', 'Resistencia extrema', 'Balance perfecto para combate']
    };

    const magicStaff: Arma = {
      id: '', nombre: 'Magic Staff', tipo: 'arma', tipoArma: 'baston', faccion: 'malvada', tipoPoder: 'magia',
      descripcion: 'Báculo mágico personal de Evil-Lyn, canaliza sus poderes de hechicería oscura',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/2/2d/Evil-Lyn_Staff_2002.jpg',
      portador: 'Evil-Lyn', material: 'Cristal mágico y metal encantado',
      alcance: 'distancia', encantamientos: ['Proyección de energía', 'Hechizos de control', 'Ilusiones'],
      habilidades: ['Dispara rayos mágicos', 'Crea ilusiones', 'Amplifica hechicería']
    };

    // LUGARES EMBLEMÁTICOS
    const castilloGrayskull: Lugar = {
      id: '', nombre: 'Castillo Grayskull', tipo: 'lugar', tipoLugar: 'castillo', faccion: 'heroica', tipoPoder: 'magia',
      descripcion: 'Fortaleza mágica ancestral, centro del poder de Eternia y fuente de la fuerza de He-Man',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/b/b6/Castle_Grayskull_2002.jpg', 
      gobernante: 'The Sorceress',
      habitantes: ['The Sorceress', 'Espíritu de Grayskull'], 
      caracteristicasNotables: ['Puente Mandíbula', 'Sala del Trono', 'Cámara del Poder', 'Espejo Mágico'],
      habilidades: ['Fuente de poder mágico', 'Protección mágica', 'Visión del futuro']
    };

    const snakeMountain: Lugar = {
      id: '', nombre: 'Snake Mountain', tipo: 'lugar', tipoLugar: 'fortaleza', faccion: 'malvada', tipoPoder: 'magia',
      descripcion: 'Fortaleza siniestra de Skeletor con forma de serpiente gigante, centro de las fuerzas del mal',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/9/9c/Snake_Mountain_2002.jpg', 
      gobernante: 'Skeletor',
      habitantes: ['Skeletor', 'Evil-Lyn', 'Beast Man', 'Trap Jaw'], 
      caracteristicasNotables: ['Entrada Cabeza de Serpiente', 'Mazmorras', 'Sala del Trono Oscuro', 'Laboratorio Mágico'],
      peligros: ['Trampas mortales', 'Magia oscura', 'Criaturas maléficas'], clima: 'Oscuro y amenazante'
    };

    const eternia: Lugar = {
      id: '', nombre: 'Eternia', tipo: 'lugar', tipoLugar: 'planeta', faccion: 'heroica', tipoPoder: 'magia',
      descripcion: 'Planeta mágico hogar de He-Man, donde conviven magia y tecnología en armonía',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/7/75/Eternia_2002.jpg', 
      gobernante: 'Rey Randor',
      habitantes: ['Eternianos', 'Diversas especies inteligentes'], 
      caracteristicasNotables: ['Palacio Real', 'Castillo Grayskull', 'Bosque Eterno', 'Mar de Cristal'],
      clima: 'Variado - desde bosques hasta desiertos y regiones heladas'
    };

    const palacioReal: Lugar = {
      id: '', nombre: 'Palacio Real', tipo: 'lugar', tipoLugar: 'palacio', faccion: 'heroica', tipoPoder: 'tecnologia',
      descripcion: 'Sede del gobierno de Eternia, hogar de la familia real y centro del poder político',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/3/32/Royal_Palace_2002.jpg',
      gobernante: 'Rey Randor y Reina Marlena',
      habitantes: ['Familia Real', 'Guardias Reales', 'Man-At-Arms'], 
      caracteristicasNotables: ['Sala del Trono', 'Arsenales Reales', 'Jardines', 'Torre de Vigilancia'],
      habilidades: ['Defensa avanzada', 'Comunicaciones', 'Centro de comando']
    };

    const temploSorceress: Lugar = {
      id: '', nombre: 'Sorceress Temple', tipo: 'lugar', tipoLugar: 'templo', faccion: 'heroica', tipoPoder: 'magia',
      descripcion: 'Templo sagrado dentro del Castillo Grayskull, santuario de la Sorceress',
      urlImagen: 'https://static.wikia.nocookie.net/heman/images/1/1f/Sorceress_Chamber_2002.jpg',
      gobernante: 'The Sorceress',
      habitantes: ['The Sorceress'], 
      caracteristicasNotables: ['Altar de Transformación', 'Cristales de Poder', 'Espejos Mágicos', 'Biblioteca Arcana'],
      habilidades: ['Transformación de Adam', 'Visiones proféticas', 'Comunicación telepática']
    };

    // Agregar todas las entidades al sistema
    [heMan, skeletor, teela, beastMan, evilLyn, manAtArms, orko, battleCat, merMan, trapJaw].forEach(personaje => this.agregarEntidad(personaje));
    [espadaPoder, baculoCaos, escudoHeMan, battleAxe, magicStaff].forEach(arma => this.agregarEntidad(arma));
    [castilloGrayskull, snakeMountain, eternia, palacioReal, temploSorceress].forEach(lugar => this.agregarEntidad(lugar));
  }
}
