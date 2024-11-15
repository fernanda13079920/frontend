import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizarmedico',
  templateUrl: './actualizarmedico.component.html',
  styleUrls: ['./actualizarmedico.component.scss']
})
export class ActualizarmedicoComponent implements OnInit {

  medicoId: string = '';
  medico: any = null;
  sucursales: any[] = [];
  especialidades: any[] = [];

  constructor(private route: ActivatedRoute, private medicoService: AdministradorService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicoId = id;
      this.obtenerMedico();
    }
    this.medicoService.listarSucursales().subscribe(
      (response) => {
        this.sucursales = response;
      },
      (error) => {
        console.error('Error al obtener sucursales:', error);
      }
    );

    this.medicoService.listarEspecialidades().subscribe(
      (response) => {
        this.especialidades = response;
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  }

  obtenerMedico(): void {
    this.medicoService.obtenerMedico(this.medicoId).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
        this.medico = response || {
          medicoDTO: {
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            estado: true,
            email: '',
            id_usuario: 'null',
            id_sucursal_especialidad: 'null'
          },
          sucursalEspecialidadDTO: {
            id_sucursal: 0,
            id_especialidad: 0
          }
        };
        console.log('Datos del médico asignados:', this.medico);
      },
      (error) => {
        console.error('Error al obtener el médico:', error);
      }
    );
  }

  actualizarMedico(): void {
    this.medicoService.actualizarMedico(this.medicoId, this.medico).subscribe(
      (response) => {
        alert('Médico actualizado exitosamente!');
      },
      (error) => {
        console.error('Error al actualizar el médico:', error);
        alert('Hubo un error al actualizar el médico.');
      }
    );
  }
}
