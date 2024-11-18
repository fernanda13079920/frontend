import {
  Component,
  signal,
  WritableSignal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  FormularioSesionService,
  MedicamentoOption,
  EstudioOption,
} from '../../services/formulario-sesion.service';

import { TimerManager } from '../../utils/timer.utils';

interface Medicamento {
  nombre: string;
  dosisIndicaciones: string;
}

interface Estudio {
  nombre: string;
}

interface ArchivoSeleccionado {
  file: File;
  id: string;
}

function writableSignal<T>(signal: WritableSignal<T>) {
  return {
    get value(): T {
      return signal();
    },
    set value(v: T) {
      signal.set(v);
    },
  };
}

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-sesion.component.html',
  styleUrls: ['./formulario-sesion.component.css'],
})
export class FormularioSesionComponent implements OnInit, OnDestroy {
  fechaCreacion: string;
  nombrePaciente = signal('');
  edad = signal(0);

  nombrePacienteModel = writableSignal(this.nombrePaciente);
  edadModel = writableSignal(this.edad);

  fecha = signal('');
  horaInicio = signal('');
  observaciones = signal('');
  diagnostico = signal('');

  fechaModel = writableSignal(this.fecha);
  horaInicioModel = writableSignal(this.horaInicio);
  observacionesModel = writableSignal(this.observaciones);
  diagnosticoModel = writableSignal(this.diagnostico);

  medicamentos = signal<Medicamento[]>([{ nombre: '', dosisIndicaciones: '' }]);
  estudios = signal<Estudio[]>([{ nombre: '' }]);
  archivosSeleccionados = signal<ArchivoSeleccionado[]>([]);

  // Nuevas propiedades para las opciones de medicamentos y estudios
  medicamentosOptions = signal<MedicamentoOption[]>([]);
  estudiosOptions = signal<EstudioOption[]>([]);

  //aca modificas el tiempo que quieras que el usuario tenga para editar el fomrulario
  private timerManager: TimerManager;
  readonly tiempoRestante;
  readonly tiempoFormateado;

  // Indicador de guardado
  guardando = signal(false);

  constructor(
    private sesionService: FormularioSesionService,
    private router: Router
  ) {
    this.fechaCreacion = new Date().toLocaleDateString();

    // Inicializar el TimerManager
    this.timerManager = new TimerManager(router);
    this.tiempoRestante = this.timerManager.getTiempoRestante();
    this.tiempoFormateado = this.timerManager.getTiempoFormateado();

    this.timerManager.iniciarContador();
  }

  ngOnInit() {
    // Cargar las opciones de medicamentos y estudios
    this.sesionService
      .getMedicamentos()
      .subscribe((medicamentos) => this.medicamentosOptions.set(medicamentos));

    this.sesionService
      .getEstudios()
      .subscribe((estudios) => this.estudiosOptions.set(estudios));
  }

  ngOnDestroy() {
    this.timerManager.detenerContador();
  }

  agregarMedicamento() {
    this.medicamentos.update((med) => [
      ...med,
      { nombre: '', dosisIndicaciones: '' },
    ]);
  }

  eliminarMedicamento(index: number) {
    this.medicamentos.update((med) => med.filter((_, i) => i !== index));
  }

  agregarEstudio() {
    this.estudios.update((est) => [...est, { nombre: '' }]);
  }

  eliminarEstudio(index: number) {
    this.estudios.update((est) => est.filter((_, i) => i !== index));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files) {
      const nuevosArchivos: ArchivoSeleccionado[] = Array.from(files).map(
        (file) => ({
          file: file,
          id: crypto.randomUUID(),
        })
      );

      this.archivosSeleccionados.update((archivos) => [
        ...archivos,
        ...nuevosArchivos,
      ]);
    }

    input.value = '';
  }

  eliminarArchivo(id: string) {
    this.archivosSeleccionados.update((archivos) =>
      archivos.filter((archivo) => archivo.id !== id)
    );
  }

  guardarSesion() {
    if (this.guardando()) return;

    this.guardando.set(true);

    const sesion = {
      fechaCreacion: this.fechaCreacion,
      nombrePaciente: this.nombrePaciente(),
      edad: this.edad(),
      fecha: this.fecha(),
      horaInicio: this.horaInicio(),
      observaciones: this.observaciones(),
      medicamentos: this.medicamentos(),
      estudios: this.estudios(),
      diagnostico: this.diagnostico(),
      archivos: this.archivosSeleccionados().map((a) => a.file),
    };

    this.sesionService.guardarSesion(sesion).subscribe({
      next: (sesionGuardada) => {
        console.log('Sesión guardada exitosamente:', sesionGuardada);
        // Aquí podrías mostrar un mensaje de éxito
        alert('Sesión guardada exitosamente');

        // Opcional: resetear el formulario
        this.resetearFormulario();
      },
      error: (error) => {
        console.error('Error al guardar la sesión:', error);
        alert('Error al guardar la sesión');
      },
      complete: () => {
        this.guardando.set(false);
      },
    });
  }

  private resetearFormulario() {
    // Resetear todos los campos
    this.nombrePaciente.set('');
    this.edad.set(0);
    this.fecha.set('');
    this.horaInicio.set('');
    this.observaciones.set('');
    this.diagnostico.set('');
    this.medicamentos.set([{ nombre: '', dosisIndicaciones: '' }]);
    this.estudios.set([{ nombre: '' }]);
    this.archivosSeleccionados.set([]);
  }
}
