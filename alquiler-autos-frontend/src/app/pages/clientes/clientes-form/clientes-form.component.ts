import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  error: string | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clienteService = inject(ClienteService);

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.cargarCliente();
    }
  }

  cargarCliente() {
    this.clienteService.obtenerPorId(this.id!).subscribe({
      next: (cliente) => this.form.patchValue(cliente),
      error: (err) => this.error = 'Error al cargar el cliente'
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.error = 'Por favor completa los campos requeridos';
      return;
    }

    const cliente = this.form.value;

    if (this.id) {
      this.clienteService.actualizar(this.id, cliente).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: () => this.error = 'Error al actualizar el cliente'
      });
    } else {
      this.clienteService.crear(cliente).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: () => this.error = 'Error al registrar el cliente'
      });
    }
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}
