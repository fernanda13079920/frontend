// src/app/components/dashboard/dashboard.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <nav class="sidebar" [class.collapsed]="sidebarCollapsed()">
        <div class="sidebar-header">
          <div class="logo-container">
            <span class="logo">🎯</span>
            <span class="logo-text" *ngIf="!sidebarCollapsed()">Dashboard</span>
          </div>
          <button class="collapse-btn" (click)="toggleSidebar()">
            {{ sidebarCollapsed() ? '→' : '←' }}
          </button>
        </div>

        <div class="user-info" *ngIf="!sidebarCollapsed()">
          <div class="user-avatar">👤</div>
          <div class="user-details">
            <h3>Admin User</h3>
            <p>Administrador</p>
          </div>
        </div>

        <div class="sidebar-menu">
          <a
            routerLink="/dashboard"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="menu-item"
          >
            <span class="menu-icon">📊</span>
            <span class="menu-text" *ngIf="!sidebarCollapsed()">Dashboard</span>
          </a>

          <a
            routerLink="/dashboard/clients"
            routerLinkActive="active"
            class="menu-item"
          >
            <span class="menu-icon">👥</span>
            <span class="menu-text" *ngIf="!sidebarCollapsed()">Clientes</span>
          </a>

          <a
            routerLink="/dashboard/formulario-sesion"
            routerLinkActive="active"
            class="menu-item"
          >
            <span class="menu-icon">📦</span>
            <span class="menu-text" *ngIf="!sidebarCollapsed()"
              >Sesión Médica</span
            >
          </a>

          <a
            routerLink="/dashboard/students"
            routerLinkActive="active"
            class="menu-item"
          >
            <span class="menu-icon">🎓</span>
            <span class="menu-text" *ngIf="!sidebarCollapsed()"
              >Estudiantes</span
            >
          </a>

          <a
            routerLink="/dashboard/profile"
            routerLinkActive="active"
            class="menu-item"
          >
            <span class="menu-icon">⚙️</span>
            <span class="menu-text" *ngIf="!sidebarCollapsed()">Perfil</span>
          </a>
        </div>

        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <span class="menu-icon">🚪</span>
            <span class="menu-text" *ngIf="!sidebarCollapsed()"
              >Cerrar Sesión</span
            >
          </button>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <header class="content-header">
          <div class="header-left">
            <h1>{{ getCurrentPageTitle() }}</h1>
          </div>
          <div class="header-right">
            <div class="search-bar">
              <input type="text" placeholder="Buscar..." />
              <span class="search-icon">🔍</span>
            </div>
            <div class="user-menu">
              <span class="notifications">🔔</span>
              <div class="user-avatar-small">👤</div>
            </div>
          </div>
        </header>

        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        display: flex;
        min-height: 100vh;
        background-color: #f0f2f5;
      }

      /* Sidebar Styles */
      .sidebar {
        width: 260px;
        background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100vh;
        box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
      }

      .sidebar.collapsed {
        width: 80px;
      }

      .sidebar-header {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .logo {
        font-size: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.5rem;
        border-radius: 8px;
      }

      .logo-text {
        font-size: 1.2rem;
        font-weight: 600;
      }

      .collapse-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }

      .collapse-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .user-info {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .user-avatar {
        font-size: 2rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.5rem;
        border-radius: 50%;
      }

      .user-details h3 {
        margin: 0;
        font-size: 1rem;
      }

      .user-details p {
        margin: 0;
        font-size: 0.8rem;
        opacity: 0.7;
      }

      .sidebar-menu {
        padding: 1rem;
        flex: 1;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1rem;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
        margin-bottom: 0.5rem;
      }

      .menu-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .menu-item.active {
        background: rgba(255, 255, 255, 0.2);
      }

      .menu-icon {
        font-size: 1.2rem;
      }

      .sidebar-footer {
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .logout-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1rem;
        background: rgba(255, 0, 0, 0.1);
        border: none;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .logout-btn:hover {
        background: rgba(255, 0, 0, 0.2);
      }

      /* Main Content Styles */
      .main-content {
        flex: 1;
        margin-left: 260px;
        transition: all 0.3s ease;
        min-height: 100vh;
      }

      .sidebar.collapsed + .main-content {
        margin-left: 80px;
      }

      .content-header {
        background: white;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-left h1 {
        margin: 0;
        font-size: 1.5rem;
        color: #1e3c72;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .search-bar {
        position: relative;
      }

      .search-bar input {
        padding: 0.5rem 1rem;
        padding-left: 2.5rem;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        width: 250px;
        transition: all 0.3s ease;
      }

      .search-bar input:focus {
        outline: none;
        border-color: #1e3c72;
        width: 300px;
      }

      .search-icon {
        position: absolute;
        left: 0.8rem;
        top: 50%;
        transform: translateY(-50%);
      }

      .user-menu {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .notifications {
        font-size: 1.2rem;
        cursor: pointer;
      }

      .user-avatar-small {
        font-size: 1.2rem;
        background: #f0f2f5;
        padding: 0.5rem;
        border-radius: 50%;
        cursor: pointer;
      }

      .content-wrapper {
        padding: 2rem;
        background: #f0f2f5;
      }

      @media (max-width: 768px) {
        .sidebar {
          width: 80px;
        }

        .main-content {
          margin-left: 80px;
        }

        .menu-text {
          display: none;
        }

        .user-info {
          display: none;
        }

        .search-bar input {
          width: 150px;
        }

        .search-bar input:focus {
          width: 200px;
        }
      }
    `,
  ],
})
export class DashboardComponent {
  sidebarCollapsed = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.sidebarCollapsed.update((value) => !value);
  }

  getCurrentPageTitle(): string {
    const url = this.router.url;
    if (url.includes('clients')) return 'Gestión de Clientes';
    if (url.includes('formulario-sesion')) return 'Sesión Médica';
    if (url.includes('students')) return 'Gestión de Estudiantes';
    if (url.includes('profile')) return 'Perfil de Usuario';
    return 'Dashboard';
  }

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
