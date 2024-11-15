import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-listaespecialidad',
  templateUrl: './listaespecialidad.component.html',
  styleUrl: './listaespecialidad.component.scss'
})
export class ListaespecialidadComponent {

  constructor(private administradorService: AdministradorService) { }
  especialidades: any[] = [];

  ngOnInit(): void {
    this.administradorService.listarEspecialidades().subscribe(
      (response) => {
        this.especialidades = response;
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  
}

}
