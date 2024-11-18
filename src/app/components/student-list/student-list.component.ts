import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  clients = signal<Client[]>([]);
  showForm = signal(false);
  editingClient = signal<Client | null>(null);
  searchTerm = '';

  currentClient = signal<Client>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
  });

  filteredClients = computed(() => {
    const term = this.searchTerm.toLowerCase();
    return this.clients().filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone.includes(term) ||
        client.address.toLowerCase().includes(term)
    );
  });

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    // Inicializar con los clientes de prueba
    this.clients.set(this.clientService.getClients()());
  }

  onSubmit() {
    if (this.editingClient()) {
      this.clientService.updateClient({
        ...this.currentClient(),
        id: this.editingClient()!.id,
      });
    } else {
      this.clientService.addClient(this.currentClient());
    }
    this.resetForm();
  }

  editClient(client: Client) {
    this.editingClient.set(client);
    this.currentClient.set({ ...client });
    this.showForm.set(true);
  }

  deleteClient(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clientService.deleteClient(id);
      this.clients.set(this.clientService.getClients()());
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.showForm.set(false);
    this.editingClient.set(null);
    this.currentClient.set({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'active',
    });
  }

  exportToCSV() {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Dirección', 'Estado'];
    const csvData = this.clients().map((client) => [
      client.name,
      client.email,
      client.phone,
      client.address,
      client.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  sortClients(field: keyof Client) {
    this.clients.update((clients) =>
      [...clients].sort((a, b) => (a[field] < b[field] ? -1 : 1))
    );
  }

  getStatusColor(status: string): string {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }
}
