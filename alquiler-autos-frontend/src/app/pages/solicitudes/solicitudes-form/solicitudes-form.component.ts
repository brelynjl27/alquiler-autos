import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudCreditoService, SolicitudCredito } from '../../../services/solicitud.service';

@Component({
  selector: 'app-solicitudes-form',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './solicitudes-form.component.html',
  styleUrls: ['./solicitudes-form.component.css']
})
export class SolicitudesFormComponent implements OnInit {

  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudCreditoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      autoId: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      estado: ['PENDIENTE', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.solicitudService.obtenerPorId(this.id).subscribe({
        next: data => this.form.patchValue(data),
        error: err => console.error('Error al obtener solicitud', err)
      });
    }
  }

  guardar(): void {
    const solicitud: SolicitudCredito = this.form.value;

    if (this.id) {
      this.solicitudService.actualizar(this.id, solicitud).subscribe({
        next: () => this.router.navigate(['/solicitudes']),
        error: err => console.error('Error al actualizar', err)
      });
    } else {
      this.solicitudService.crear(solicitud).subscribe({
        next: () => this.router.navigate(['/solicitudes']),
        error: err => console.error('Error al crear', err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);
  }
}
