import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // El componente principal de la aplicación
import { appConfig } from './app/app.config';  // Importa la configuración de rutas y proveedores
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { importProvidersFrom } from '@angular/core';  // Necesario para proporcionar módulos en aplicaciones standalone

// Cambia el nombre de la constante para evitar conflicto
const appProvidersConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),  // Agrega HttpClientModule para que esté disponible en toda la aplicación
    ...appConfig.providers // Si quieres usar los proveedores definidos en app.config.ts
  ]
};

bootstrapApplication(AppComponent, appProvidersConfig)
  .catch((err) => console.error(err));
