import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userEmail: string | null = '';
  mensaje: string | null = '';
  sidebarCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('adminEmail');
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  mostrarMensaje(opcion: string): void {
    this.mensaje = `Has seleccionado ${opcion}`;
  }

  getCurrentPageTitle(): string {
    // Ajusta los títulos de las páginas según la ruta actual
    const url = this.router.url;
    if (url.includes('listar-medico')) return 'Lista de Médicos';
    if (url.includes('ver-consultas')) return 'Consultas';
    if (url.includes('ver-sucursales')) return 'Sucursales';
    if (url.includes('ver-especialidades')) return 'Especialidades';
    if (url.includes('ver-horarios')) return 'Horarios';
    return 'Dashboard';
  }

  logout(): void {
    // Limpiar los datos de autenticación y redirigir a la página de inicio de sesión
    localStorage.removeItem('adminEmail');
    this.router.navigate(['/login']);
  }
}
