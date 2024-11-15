import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-listasucursal',
  templateUrl: './listasucursal.component.html',
  styleUrl: './listasucursal.component.scss'
})
export class ListasucursalComponent {
  constructor(private sucursalService: AdministradorService) { }
  sucursales: any[] = [];
  ngOnInit(): void {
    this.sucursalService.listarSucursales().subscribe(
      (response) => {
        this.sucursales = response;
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  
}
}
