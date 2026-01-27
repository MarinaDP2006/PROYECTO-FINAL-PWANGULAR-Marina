# MOTU Universe - Masters of the Universe

![Masters of the Universe](https://img.shields.io/badge/MOTU-Universe-red)
![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)

## 🗡️ Descripción del Proyecto

**MOTU Universe** es una aplicación web desarrollada en Angular 21 que permite gestionar y explorar el universo de **Masters of the Universe (He-Man)**. La aplicación incluye personajes, armas y lugares icónicos de la franquicia, con un sistema completo de gestión CRUD y almacenamiento local.

## ✨ Características Principales

- 🦸‍♂️ **Gestión de Personajes**: He-Man, Skeletor, Teela, y más héroes y villanos
- ⚔️ **Arsenal de Armas**: Espada del Poder, Báculo del Caos, y artefactos legendarios  
- 🏰 **Lugares Emblemáticos**: Castillo Grayskull, Snake Mountain, Eternia
- 💾 **Almacenamiento Local**: Datos persistentes usando localStorage
- 🔍 **Sistema de Filtros**: Búsqueda por tipo, facción, poder y categoría
- 📱 **Diseño Responsivo**: Interfaz adaptada para todos los dispositivos
- 🎨 **Temática MOTU**: Colores y diseño inspirados en la serie original

## 🚀 Tecnologías Utilizadas

- **Angular 21** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Angular Signals** - Gestión de estado reactiva
- **Standalone Components** - Arquitectura moderna sin NgModules
- **CSS3** - Estilos personalizados con temática MOTU
- **HTML5** - Estructura semántica

## 📦 Instalación y Configuración

### Prerrequisitos

```bash
node.js >= 18.0.0
npm >= 9.0.0
Angular CLI >= 21.0.0
```

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/[tu-usuario]/motu-universe.git
cd motu-universe
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

## 🗂️ Estructura del Proyecto

```
motu-universe/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── character-list/          # Lista de personajes
│   │   │   ├── character-detail/        # Detalle de personaje
│   │   │   ├── character-form/          # Formulario de personajes
│   │   │   ├── weapon-list/             # Lista de armas
│   │   │   ├── location-list/           # Lista de lugares
│   │   │   ├── navbar/                  # Barra de navegación
│   │   │   ├── services/                # Servicio de datos
│   │   │   └── interfaces/              # Tipos TypeScript
│   │   ├── app.ts                       # Componente principal
│   │   └── app.routes.ts                # Configuración de rutas
│   ├── styles.css                       # Estilos globales
│   └── index.html                       # HTML principal
├── public/
│   └── assets/                          # Recursos estáticos
└── package.json                         # Configuración NPM
```

## 🎯 Funcionalidades

### Gestión de Entidades

- **Crear**: Agregar nuevos personajes, armas y lugares
- **Leer**: Visualizar detalles completos de cada entidad
- **Actualizar**: Editar información existente
- **Eliminar**: Remover entidades del sistema

### Sistema de Filtros

- Filtro por tipo de entidad (personaje, arma, lugar)
- Filtro por facción (heroica, malvada, neutral)
- Filtro por tipo de poder (magia, tecnología, natural)
- Búsqueda por texto en nombre y descripción

### Datos Incluidos

**Personajes Principales:**
- He-Man (El Más Poderoso del Universo)
- Skeletor (Señor de los Huesos) 
- Teela (Guerrera de Grayskull)
- Beast Man, Evil-Lyn, Man-At-Arms
- Orko, Battle Cat, Mer-Man, Trap Jaw

**Armas Legendarias:**
- Espada del Poder
- Báculo del Caos (Havoc Staff)
- Escudo de He-Man
- Battle Axe de Man-At-Arms
- Báculo Mágico de Evil-Lyn

**Lugares Emblemáticos:**
- Castillo Grayskull
- Snake Mountain  
- Planeta Eternia
- Palacio Real de Eternos
- Templo de la Sorceress

## 🛠️ Scripts de Desarrollo

```bash
# Servidor de desarrollo
ng serve

# Compilar para producción
ng build --prod

# Ejecutar tests
ng test

# Linting del código
ng lint

# Verificar formato de código
npx prettier --check "src/**/*.{ts,html,css}"
```

## 🎨 Personalización

El proyecto usa una paleta de colores inspirada en MOTU:

```css
:root {
  --motu-primary: #4169E1;      /* Azul He-Man */
  --motu-secondary: #8B4513;    /* Marrón tierra */
  --motu-accent: #FFD700;       /* Dorado poder */
  --motu-success: #32CD32;      /* Verde mágico */
  --motu-danger: #DC143C;       /* Rojo batalla */
  --motu-dark: #2F2F2F;         /* Negro Skeletor */
}
```

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móviles iOS/Android

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo y está inspirado en Masters of the Universe. 
Los derechos de MOTU pertenecen a Mattel Inc.

## 👨‍💻 Autor

**Marina** - Desarrolladora Full Stack
- 📧 Email: marina@ejemplo.com
- 💻 GitHub: [@marina](https://github.com/marina)

## 🙏 Agradecimientos

- Mattel Inc. por crear el universo de Masters of the Universe
- Filmation por la serie animada clásica
- Comunidad Angular por las herramientas y documentación
- Fans de MOTU por mantener vivo el legado

---

<div align="center">
  <h3>🗡️ "¡Por el poder de Grayskull!" 🏰</h3>
  <p><em>Proyecto creado con 💙 para fans de Masters of the Universe</em></p>
</div>