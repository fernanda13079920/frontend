import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { loginGuard } from './guard/login.guard';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { CrearconsultaComponent } from './pages/crearconsulta/crearconsulta.component';
import { VerconsultaComponent } from './pages/verconsulta/verconsulta.component';
import { CrearhorarioComponent } from './pages/crearhorario/crearhorario.component';
import { VerhorariosComponent } from './pages/verhorarios/verhorarios.component';
import { CrearmedicoComponent } from './pages/crearmedico/crearmedico.component';
import { CrearespecialidadComponent } from './pages/crearespecialidad/crearespecialidad.component';
import { ListaespecialidadComponent } from './pages/listaespecialidad/listaespecialidad.component';
import { ListasucursalComponent } from './pages/listasucursal/listasucursal.component';
import { CrearsucursalComponent } from './pages/crearsucursal/crearsucursal.component';
import { ListamedicoComponent } from './pages/listamedico/listamedico.component';
import { ActualizarmedicoComponent } from './pages/actualizarmedico/actualizarmedico.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', 
     component: LayoutComponent,
    children: [
      { path: 'actualizar-medico/:id', component: ActualizarmedicoComponent,
        canActivate:[loginGuard]
       }, // otras rutas
   
      {
        path: 'crear-consulta',
        component: CrearconsultaComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'ver-consultas',
        component: VerconsultaComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'crear-horario',
        component: CrearhorarioComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'ver-horarios',
        component: VerhorariosComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'crear-medico',
        component: CrearmedicoComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'listar-medico',
        component: ListamedicoComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'crear-especialidad',
        component: CrearespecialidadComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'ver-especialidades',
        component: ListaespecialidadComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'crear-sucursal',
        component: CrearsucursalComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'ver-sucursales',
        component: ListasucursalComponent,
        canActivate: [loginGuard]
      },
    ]
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [loginGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
