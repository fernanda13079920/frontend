import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  //////////////// LOGIN //////////////////////
  login(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}login`, credentials);
  }

  //////////////// ESPECIALIDADES ////////////////////
  obtenerEspecialidad(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}especialidad/${id}`);
  }

  listarEspecialidades(): Observable<any> {
    return this.http.get(`${this.url}especialidad/listar`);
  }

  crearEspecialidad(credentials: { nombre: string; descripcion: string }): Observable<any> {
    return this.http.post(`${this.url}especialidad/guardar`, credentials);
  }

  eliminarEspecialidad(id: number): Observable<any> {
    return this.http.delete(`${this.url}especialidad/eliminar/${id}`);
  }

  actualizarEspecialidad(id: number, especialidad: any): Observable<any> {
    return this.http.put<any>(`${this.url}especialidad/modificar/${id}`, especialidad);
  }

  //////////////// MEDICO ///////////////////
  listarMedicos(): Observable<any> {
    return this.http.get(`${this.url}medico/listar`);
  }

  crearMedico(credentials: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    estado: boolean;
    email: string;
    especialidad: { id: number };
  }): Observable<any> {
    return this.http.post(`${this.url}medico/crear`, credentials);
  }

  actualizarMedico(id: number, medico: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    estado: boolean;
    email: string;
    especialidad: { id: number };
  }): Observable<any> {
    return this.http.put(`${this.url}medico/modificar/${id}`, medico);
  }

  obtenerMedico(id: number): Observable<any> {
    return this.http.get(`${this.url}medico/${id}`);
  }

  eliminarMedico(id: number): Observable<any> {
    return this.http.delete(`${this.url}medico/eliminar/${id}`);
  }
}
