import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface DashboardSummary {
  totalClientes: number;
  totalAutos: number;
  totalSolicitudes: number;
  totalMontoSolicitudes: number;

  
  autosDisponibles?: number;
  solicitudesPendientes?: number;
  solicitudesAprobadas?: number;
  solicitudesRechazadas?: number;
  solicitudesPorMes?: { mes: string; total: number }[];
  topAutos?: { marcaModelo: string; ventas: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private base = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  
  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.base}/dashboard/summary`);
  }

 
  buscarAutos(q: { marca?: string; disponible?: boolean }) {
    const params: any = {};
    if (q.marca) params.marca = q.marca;
    if (typeof q.disponible !== 'undefined') params.disponible = q.disponible;
    return this.http.get<any[]>(`${this.base}/autos/search`, { params });
  }
}
