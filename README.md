# PROYECTO-FINAL-PWANGULAR-Marina
La aplicación gestiona información sobre el universo de Masters of the Universe (MOTU), incluyendo personajes, armas y lugares.

### Características
- **Gestión de Personajes**: Lista detallada y formularios para personajes de MOTU
- **Gestión de Armas**: Lista de Armas
- **Gestión de Lugares**: Información sobre lugares 
- **Navegación**: Navegación completo con navbar
- **Datos en Memoria**: Servicio de datos como simulador

### Estructura
```
src/
├── app/
│   ├── components/
│   │   ├── inicio/                 # Componente de página principal
│   │   ├── listaPersonaje/         # Lista de personajes
│   │   ├── detallesPersonaje/      # Detalles de personajes
│   │   ├── formPersonaje/          # Formulario de personajes
│   │   ├── listaArmas/             # Lista de armas
│   │   ├── listaLugares/           # Lista de lugares
│   │   ├── navbar/                 # Barra de navegación
│   │   ├── interfaces/             # Tipos TypeScript
│   │   └── servicioDATA/           # Servicios de datos
│   ├── app.config.ts
│   ├── app.module.ts
│   └── app.routes.ts
├── images/                         # Imágenes
│   ├── personajes/
│   ├── armas/
│   └── lugares/
└── styles.css
```

### Usado
- **Angular**: Framework principal
- **TypeScript**: Lenguaje de programación
- **HTML/CSS**: Estructura y estilos
- **Angular Router**: Navegación entre componentes
- **Servicios Angular**: Gestión de datos

### Instalación y Ejecución
```
# Clonar el repositorio: git clone [[(https://github.com/MarinaDP2006/PROYECTO-FINAL-PWANGULAR-Marina/tree/main)]
# Instalar dependencias: npm install
# Ejecutar la aplicación:  ng serve
# La aplicación se ve en http://localhost:4200
