import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { CrearconsultaComponent } from './pages/crearconsulta/crearconsulta.component';
import { VerconsultaComponent } from './pages/verconsulta/verconsulta.component';
import { CrearhorarioComponent } from './pages/crearhorario/crearhorario.component';
import { VerhorariosComponent } from './pages/verhorarios/verhorarios.component';
import { CrearmedicoComponent } from './pages/crearmedico/crearmedico.component';
import { CrearespecialidadComponent } from './pages/crearespecialidad/crearespecialidad.component';
import { ListaespecialidadComponent } from './pages/listaespecialidad/listaespecialidad.component';
import { AuthInterceptorService } from './pages/auth-interceptor.service';
import { CrearsucursalComponent } from './pages/crearsucursal/crearsucursal.component';
import { ListasucursalComponent } from './pages/listasucursal/listasucursal.component';
import { ListamedicoComponent } from './pages/listamedico/listamedico.component';
import { ActualizarmedicoComponent } from './pages/actualizarmedico/actualizarmedico.component';
@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    DashboardAdminComponent,
    CrearconsultaComponent,
    VerconsultaComponent,
    CrearhorarioComponent,
    VerhorariosComponent,
    CrearmedicoComponent,
    CrearespecialidadComponent,
    ListaespecialidadComponent,
    CrearsucursalComponent,
    ListasucursalComponent,
    ListamedicoComponent,
    ActualizarmedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
