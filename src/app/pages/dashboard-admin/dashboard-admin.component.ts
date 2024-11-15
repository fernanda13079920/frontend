import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {
  userEmail: string | null = '';
  mensaje: string | null = '';
  constructor(private router:Router){}
  
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('adminEmail');
  };
  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
