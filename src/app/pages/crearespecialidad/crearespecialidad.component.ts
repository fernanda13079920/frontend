import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-crearespecialidad',
  templateUrl: './crearespecialidad.component.html',
  styleUrl: './crearespecialidad.component.scss'
})
export class CrearespecialidadComponent {
  especialidad = {
    nombre: '',
    descripcion: ''
  };
  constructor(private especialidadService:AdministradorService ) { }
  crearEspecialidad(): void {
    if(this.especialidad.nombre!=='' && this.especialidad.descripcion!=='' ){

      this.especialidadService.crearEspecialidad(this.especialidad).subscribe(
        response => {
          console.log('Especialidad creada:', response);
          alert('Especialidad creada exitosamente!');
        },
        error => {
          console.error('Error:', error);
          alert('Hubo un error al crear la especialidad.');
        }
      );
    }else{
      alert('los campos no pueden estar vacios')
    }
      
  }

}
