import { Injectable, signal } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientsData = signal<Client[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+34 123 456 789',
      address: 'Calle Principal 123, Madrid',
      status: 'active',
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria@example.com',
      phone: '+34 987 654 321',
      address: 'Avenida Central 456, Barcelona',
      status: 'active',
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      phone: '+34 555 123 456',
      address: 'Plaza Mayor 789, Valencia',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Ana García',
      email: 'ana@example.com',
      phone: '+34 666 789 012',
      address: 'Calle Secundaria 321, Sevilla',
      status: 'active',
    },
  ]);

  getClients() {
    return this.clientsData;
  }

  addClient(client: Client) {
    const newClient = {
      ...client,
      id: Math.max(...this.clientsData().map((c) => c.id)) + 1,
    };
    this.clientsData.update((clients) => [...clients, newClient]);
  }

  updateClient(client: Client) {
    this.clientsData.update((clients) =>
      clients.map((c) => (c.id === client.id ? client : c))
    );
  }

  deleteClient(id: number) {
    this.clientsData.update((clients) => clients.filter((c) => c.id !== id));
  }
}
