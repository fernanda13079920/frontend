import { Signal, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export class TimerManager {
  private intervalId: number | undefined;
  readonly tiempoRestante = signal(200);

  readonly tiempoFormateado = computed(() => {
    const minutos = Math.floor(this.tiempoRestante() / 60);
    const segundos = this.tiempoRestante() % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos
      .toString()
      .padStart(2, '0')}`;
  });

  constructor(private router: Router) {}

  iniciarContador(): void {
    this.intervalId = window.setInterval(() => {
      this.tiempoRestante.update((tiempo) => {
        if (tiempo <= 1) {
          this.tiempoExpirado();
          return 0;
        }
        return tiempo - 1;
      });
    }, 1000);
  }

  detenerContador(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private tiempoExpirado(): void {
    this.detenerContador();
    alert('¡El tiempo de la sesión ha expirado!');
    this.router.navigate(['/dashboard/clients']);
  }

  getTiempoRestante(): Signal<number> {
    return this.tiempoRestante.asReadonly();
  }

  getTiempoFormateado(): Signal<string> {
    return this.tiempoFormateado;
  }
}
