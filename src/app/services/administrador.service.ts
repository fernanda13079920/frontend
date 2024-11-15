import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private url = 'http://localhost:8080/'
  constructor(private http: HttpClient) { }
  /////////////////// LOGIN ///////////////////////
  login(credentials: { correo: string, password: string }): Observable<any> {
    return this.http.post(this.url + 'login', credentials);
  }
  ////////////////// ESPECIALIDADES ////////////////////
  listarEspecialidades(): Observable<any> {
    return this.http.get(this.url + 'especialidad/listar');
  }
  crearEspecialidad(credentials: { nombre: string, descripcion: string }): Observable<any> {
    return this.http.post(this.url + 'especialidad/guardar', credentials)
  }
  /////////////////// SUCURSALES  /////////////////////////
  crearSucursal(credentials: { nombre: string, direccion: string }): Observable<any> {
    return this.http.post(this.url + 'sucursal/guardar', credentials)
  }
  listarSucursales(): Observable<any> {
    return this.http.get(this.url + 'sucursal/listar');
  }
  ////////////////// MEDICO ////////////////
  listarMedicos(): Observable<any> {
    return this.http.get(this.url + 'medico/listar')
  }
  crearMedico(credentials: {
    medicoDTO: {
      nombre: string,
      apellido_paterno: string,
      apellido_materno: string,
      estado: boolean,
      email: string,
      id_usuario: string,
      id_sucursal_especialidad: string
    },
    sucursalEspecialidadDTO: {
      id_sucursal: number,
      id_especialidad: number
    }
  }): Observable<any> {
    return this.http.post(this.url + 'medico/crear', credentials);
  }
  actualizarMedico(id: string, medico: any): Observable<any> {
    return this.http.put(`${this.url}/medico/modificar/${id}`, medico);
  }
  obtenerMedico(id: string): Observable<any> {
    return this.listarMedicos().pipe(map(medicos => medicos.find((medico: any) =>
      medico.id === id)));
  }

}
