import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación Angular
 *
 * Define los providers globales de la aplicación utilizando el nuevo
 * sistema de configuración standalone de Angular 17+.
 *
 * Esta configuración reemplaza el tradicional app.module.ts y ofrece:
 * - Mejor tree-shaking
 * - Carga más eficiente
 * - Mayor flexibilidad en la configuración
 * - Compatibilidad con el nuevo bootstrapApplication()
 *
 * @see https://angular.io/guide/standalone-components
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Manejador global de errores para el navegador
    // Captura errores no manejados y los reporta al sistema de logging
    provideBrowserGlobalErrorListeners(),

    // Configuración del router de Angular
    // Gestiona toda la navegación de la SPA y el historial del navegador
    provideRouter(routes),

    // Cliente HTTP con interceptores del DI
    // Permite realizar peticiones HTTP y aplicar interceptores
    // withInterceptorsFromDi() mantiene compatibilidad con interceptores existentes
    provideHttpClient(withInterceptorsFromDi())
  ]
};
