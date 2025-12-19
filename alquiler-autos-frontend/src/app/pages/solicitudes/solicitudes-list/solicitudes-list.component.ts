import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudCreditoService } from '../../../services/solicitud.service';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.css']
})
export class SolicitudesListComponent implements OnInit {

  solicitudes: any[] = [];
  loading = true;

  constructor(private solicitudService: SolicitudCreditoService) {}

  ngOnInit(): void {
    this.solicitudService.listar().subscribe({
      next: data => {
        this.solicitudes = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error al cargar solicitudes', err);
        this.loading = false;
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
      this.solicitudService.eliminar(id).subscribe({
        next: () => this.ngOnInit(),
        error: err => console.error('Error al eliminar', err)
      });
    }
  }
}
