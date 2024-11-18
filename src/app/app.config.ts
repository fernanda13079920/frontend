import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard-admin',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
];

import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),  // Proporcionar el módulo HttpClient
    importProvidersFrom(RouterModule.forRoot(routes)),  // Proporcionar las rutas
  ]
};
