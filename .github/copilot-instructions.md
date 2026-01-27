# MOTU Universe - Copilot Instructions

## Project Architecture

This is a **Masters of the Universe** Angular 21 application using standalone components and signals. The project follows modern Angular patterns with a file-based component structure.

### Key Architectural Patterns

- **Standalone Components**: All components use `imports` array instead of NgModules
- **Signal-based State**: Components use `signal()` for reactive state management
- **File Separation**: Components split into `.ts`, `.html`, and `.css` files (not inline)
- **Bootstrap Application**: Uses `bootstrapApplication()` with configuration providers

### Component Structure

Components are organized in `src/app/components/` with this intended structure:
```
components/
├── character-detail/    # Character detail view
├── character-form/      # Character creation/editing form  
├── character-list/      # Character listing/grid
├── navbar/             # Navigation component
├── interfaces/         # TypeScript interfaces
├── models/            # Data models/types
└── services/          # Injectable services
```

### Development Conventions

- **File Naming**: `app.ts`, `app.html`, `app.css` (not `app.component.ts`)
- **Component Class Names**: Simple names like `App`, not `AppComponent`
- **Selector Prefix**: Use `app-` prefix for all selectors
- **Imports**: Import Angular modules directly in component `imports` array
- **State Management**: Use `signal()` for component state, `protected readonly` for constants

### Configuration Details

- **TypeScript**: Strict mode enabled with Angular compiler strictness
- **Testing**: Vitest configured, but tests disabled in schematics (skipTests: true)
- **Build**: Uses new `@angular/build:application` builder
- **Code Style**: Prettier configured with 100 character line width and single quotes

### Development Workflow

- Start dev server: `ng serve` (runs on http://localhost:4200)
- Generate components: `ng generate component component-name` (creates in current directory)
- Build project: `ng build` (outputs to `dist/`)
- Run tests: `ng test` (uses Vitest)

### When Creating Components

1. Place in appropriate subfolder within `src/app/components/`
2. Use standalone component pattern with `imports` array
3. Separate template and styles into `.html` and `.css` files
4. Import component in parent component's `imports` array
5. Use signals for reactive state management
6. Follow the existing file naming convention

### Router Configuration

Routes are defined in [app.routes.ts](src/app/app.routes.ts) - currently empty but ready for route configuration. The main app template includes `<router-outlet>` for routing.