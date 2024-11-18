import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface MedicamentoOption {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface EstudioOption {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface SesionMedica {
  id?: number;
  fechaCreacion: string;
  nombrePaciente: string;
  edad: number;
  fecha: string;
  horaInicio: string;
  observaciones: string;
  medicamentos: {
    nombre: string;
    dosisIndicaciones: string;
  }[];
  estudios: {
    nombre: string;
  }[];
  diagnostico: string;
  archivosUrls?: string[]; // Cambiado para almacenar URLs de Cloudinary
}

interface ArchivoCloudinary {
  url: string;
  tipo: 'PDF' | 'Imagen';
  nombreOriginal: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormularioSesionService {
  private readonly CLOUDINARY_UPLOAD_URL =
    'https://api.cloudinary.com/v1_1/dvqsabodr/auto/upload';
  private readonly CLOUDINARY_UPLOAD_PRESET = 'ml_default';

  private medicamentos: MedicamentoOption[] = [
    { id: 1, nombre: 'Paracetamol', descripcion: 'Analgésico y antipirético' },
    {
      id: 2,
      nombre: 'Ibuprofeno',
      descripcion: 'Antiinflamatorio no esteroideo',
    },
    { id: 3, nombre: 'Amoxicilina', descripcion: 'Antibiótico' },
    {
      id: 4,
      nombre: 'Omeprazol',
      descripcion: 'Inhibidor de la bomba de protones',
    },
    { id: 5, nombre: 'Loratadina', descripcion: 'Antihistamínico' },
    { id: 6, nombre: 'Metformina', descripcion: 'Antidiabético oral' },
    { id: 7, nombre: 'Enalapril', descripcion: 'Antihipertensivo' },
    { id: 8, nombre: 'Diazepam', descripcion: 'Ansiolítico' },
    { id: 9, nombre: 'Salbutamol', descripcion: 'Broncodilatador' },
    { id: 10, nombre: 'Aspirina', descripcion: 'Antiagregante plaquetario' },
  ];

  private estudios: EstudioOption[] = [
    {
      id: 1,
      nombre: 'Hemograma completo',
      descripcion: 'Análisis de sangre completo',
    },
    {
      id: 2,
      nombre: 'Radiografía de tórax',
      descripcion: 'Imagen de rayos X del tórax',
    },
    {
      id: 3,
      nombre: 'Electrocardiograma',
      descripcion: 'Registro de actividad eléctrica del corazón',
    },
    {
      id: 4,
      nombre: 'Ecografía abdominal',
      descripcion: 'Imagen por ultrasonido del abdomen',
    },
    {
      id: 5,
      nombre: 'Análisis de orina',
      descripcion: 'Examen de muestra de orina',
    },
    {
      id: 6,
      nombre: 'Perfil lipídico',
      descripcion: 'Análisis de grasas en sangre',
    },
    { id: 7, nombre: 'Glucemia', descripcion: 'Medición de glucosa en sangre' },
    {
      id: 8,
      nombre: 'Resonancia magnética',
      descripcion: 'Imagen detallada por resonancia',
    },
    {
      id: 9,
      nombre: 'Tomografía computarizada',
      descripcion: 'Imagen 3D por rayos X',
    },
    {
      id: 10,
      nombre: 'Densitometría ósea',
      descripcion: 'Medición de densidad ósea',
    },
  ];

  getMedicamentos(): Observable<MedicamentoOption[]> {
    return of(this.medicamentos);
  }

  getEstudios(): Observable<EstudioOption[]> {
    return of(this.estudios);
  }

  guardarSesion(
    sesion: Omit<SesionMedica, 'archivosUrls'> & { archivos?: File[] }
  ): Observable<SesionMedica> {
    return this.upload_files_to_cloudinary(sesion.archivos || []).pipe(
      map((archivosSubidos) => {
        const sesionFinal: SesionMedica = {
          id: Math.floor(Math.random() * 1000),
          fechaCreacion: sesion.fechaCreacion,
          nombrePaciente: sesion.nombrePaciente,
          edad: sesion.edad,
          fecha: sesion.fecha,
          horaInicio: sesion.horaInicio,
          observaciones: sesion.observaciones,
          medicamentos: sesion.medicamentos,
          estudios: sesion.estudios,
          diagnostico: sesion.diagnostico,
          archivosUrls: archivosSubidos.map((archivo) => archivo.url),
        };

        console.log('Datos completos que se enviarían al backend:', {
          ...sesionFinal,
          archivos: archivosSubidos.map((archivo) => ({
            url: archivo.url,
            tipo: archivo.tipo,
            nombreOriginal: archivo.nombreOriginal,
          })),
        });

        return sesionFinal;
      })
    );
  }

  private determinarTipoArchivo(nombreArchivo: string): 'PDF' | 'Imagen' {
    const extension = nombreArchivo.toLowerCase().split('.').pop() || '';
    return extension === 'pdf' ? 'PDF' : 'Imagen';
  }

  private upload_files_to_cloudinary(
    files: File[]
  ): Observable<ArchivoCloudinary[]> {
    if (!files || files.length === 0) {
      return of([]);
    }

    const uploadObservables = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
      formData.append('api_key', '489618141249788');

      return from(
        fetch(this.CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error en la subida a Cloudinary');
            }
            return response.json();
          })
          .then((data) => ({
            url: data.secure_url,
            tipo: this.determinarTipoArchivo(file.name),
            nombreOriginal: file.name,
          }))
          .catch((error) => {
            console.error('Error al subir archivo:', error);
            throw error;
          })
      );
    });

    return forkJoin(uploadObservables);
  }
}
