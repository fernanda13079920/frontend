import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-crearmedico',
  templateUrl: './crearmedico.component.html',
  styleUrl: './crearmedico.component.scss'
})
export class CrearmedicoComponent implements OnInit {

  medico = {
    medicoDTO:{
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      estado: true,
      email: '',
      id_usuario: 'null',
      id_sucursal_especialidad: 'null'},
    sucursalEspecialidadDTO:
    {
      id_sucursal: 0, 
     id_especialidad: 0
    }
  }
  sucursales: any[] = [];
  especialidades: any[] = [];
  constructor(private medicoService: AdministradorService) { };

  ngOnInit(): void {
    this.medicoService.listarSucursales().subscribe(
      (response) => {
        console.log('Lista de sucursales:', response); 
        this.sucursales = response;
      },
      (error) => {
        console.error('Error al obtener sucursales:', error);
      }
    );

    this.medicoService.listarEspecialidades().subscribe(
      (response) => {
        console.log('Lista de especialidades:', response); 
        this.especialidades = response;
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  }

  crearMedico(): void {
    console.log('Datos del médico:', this.medico);
    this.medicoService.crearMedico(this.medico).subscribe((response) => {
      alert('Médico creado exitosamente!');
    }, error => {
      console.error('Error:', error);
      alert('Hubo un error al crear el médico.');
    })
  }
}
