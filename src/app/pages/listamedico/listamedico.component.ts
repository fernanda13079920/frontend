import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-listamedico',
  templateUrl: './listamedico.component.html',
  styleUrl: './listamedico.component.scss'
})
export class ListamedicoComponent {
  
  constructor(private medicoService: AdministradorService) { }
  medicos: any[] = [];

  ngOnInit(): void {
    this.medicoService.listarMedicos().subscribe(
      (response) => {
        this.medicos = response;
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  
}

}
