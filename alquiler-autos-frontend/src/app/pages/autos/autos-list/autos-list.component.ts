import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoService } from '../../../services/auto.service';
import { Auto } from '../../../models/autos';

@Component({
  selector: 'app-autos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './autos-list.component.html',
  styleUrls: ['./autos-list.component.css']
})
export class AutosListComponent implements OnInit {
  autos: Auto[] = [];

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.cargarAutos();
  }

  cargarAutos(): void {
    this.autoService.listarAutos().subscribe({
      next: (data) => this.autos = data,
      error: (err) => console.error('Error al listar autos', err)
    });
  }

  eliminarAuto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este auto?')) {
      this.autoService.eliminarAuto(id).subscribe({
        next: () => this.cargarAutos(),
        error: (err) => console.error('Error al eliminar auto', err)
      });
    }
  }
}
