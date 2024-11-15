import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-crearsucursal',
  templateUrl: './crearsucursal.component.html',
  styleUrl: './crearsucursal.component.scss'
})
export class CrearsucursalComponent {
  sucursal = {
    nombre: '',
    direccion: '',
  };
  constructor(private sucursalService:AdministradorService) { }
  crearSucursal(): void {
    if(this.sucursal.nombre!=='' && this.sucursal.direccion!=='' ){

      this.sucursalService.crearSucursal(this.sucursal).subscribe(
        response => {
          console.log('Especialidad creada:', response);
          alert('Sucursale creada exitosamente!');
        },
        error => {
          console.error('Error:', error);
          alert('Hubo un error al crear la Sucursal.');
        }
      );
    }else{
      alert('los campos no pueden estar vacios')
    }
      
  }
}
