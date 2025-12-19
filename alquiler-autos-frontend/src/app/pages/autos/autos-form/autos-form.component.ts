import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoService } from '../../../services/auto.service';
import { ClienteService } from '../../../services/cliente.service';
import { Auto } from '../../../models/autos';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-autos-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autos-form.component.html',
  styleUrls: ['./autos-form.component.css']
})
export class AutosFormComponent implements OnInit {

  auto: Auto = {
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    placa: '',
    precio: 0,
    cliente: undefined
  };

  clientes: Cliente[] = [];
  editMode = false;

  constructor(
    private autoService: AutoService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarClientes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.autoService.obtenerAutoPorId(+id).subscribe({
        next: (data) => this.auto = data,
        error: (err) => console.error('Error al cargar auto', err)
      });
    }
  }

   cargarClientes(): void {
  this.clienteService.listar().subscribe({
    next: (data) => this.clientes = data,
    error: (err) => console.error('Error al listar clientes', err)
  });
  }


  guardar(): void {
    if (this.editMode) {
      this.autoService.actualizarAuto(this.auto.id!, this.auto).subscribe({
        next: () => this.router.navigate(['/autos']),
        error: (err) => console.error('Error al actualizar auto', err)
      });
    } else {
      this.autoService.crearAuto(this.auto).subscribe({
        next: () => this.router.navigate(['/autos']),
        error: (err) => console.error('Error al crear auto', err)
      });
    }
  }
}
