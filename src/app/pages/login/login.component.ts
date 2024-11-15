import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
  // styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  recordar: boolean = false;
  olvidarcuenta: boolean = false;
  constructor(private administradorService: AdministradorService, private router: Router) { }

  ngOnInit(): void {
    // Recuperar los valores del almacenamiento local
    this.correo = localStorage.getItem('adminEmail') || '';
    this.password = localStorage.getItem('adminPassword') || '';
  }
  eliminarInicioDeSesion(): void {
    localStorage.removeItem('adminPassword');
    localStorage.setItem('adminPassword','')
    this.password = localStorage.getItem('adminPassword') || '';
  }
  iniciarSesion(): void {

    if (!this.correo && !this.password) {
      alert("Por favor, ingresa un correo y  una contraseña");
      return;

    }
    if (!this.correo) {
      alert("Por favor, ingresa un correo");
      return;
    }
    if (!this.password) {
      alert("Por favor,  ingresa una contraseña");
      return;
    }
    if (!this.validarCorreo(this.correo)) {
      alert("Por favor, ingresa un correo válido");
      return;
    }

    if (this.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    /// Con este metodo debo definir el acceso a componentes acorde a los roles del usuario entrante
    const credentials = { correo: this.correo, password: this.password };
    this.administradorService.login(credentials).subscribe(response => {
      localStorage.setItem('rol', response.role);
      localStorage.setItem('token', response.token)

      // agregar en el if el rol que esta ingresando para redirigir al usuario al dashboard correspondiente
      if (response.token != null) {
        alert("Inicio de sesión exitosamente!");

        this.router.navigateByUrl("dashboard-admin")
        localStorage.setItem('adminEmail', this.correo);
        if (this.recordar) {
          localStorage.setItem('adminPassword', this.password)
        }
        if (this.olvidarcuenta) {
          localStorage.removeItem('adminPassword')
        }
      }
    }, error => {
      console.error('Error:', error);
      alert("Los datos proporcionados no corresponden a un usuario existente (verifica tu correo o contraseña)");
    }
    );
  }
  validarCorreo(correo: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(correo);
  }
}
