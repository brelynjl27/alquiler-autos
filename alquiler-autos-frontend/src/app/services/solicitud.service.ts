import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface SolicitudCredito {
  id?: number;
  clienteId: number;
  autoId: number;
  monto: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudCreditoService {

  private apiUrl = `${environment.apiUrl}/solicitud_credito`;

  constructor(private http: HttpClient) {}

  listar(): Observable<SolicitudCredito[]> {
    return this.http.get<SolicitudCredito[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<SolicitudCredito> {
    return this.http.get<SolicitudCredito>(`${this.apiUrl}/${id}`);
  }

  crear(solicitud: SolicitudCredito): Observable<SolicitudCredito> {
    return this.http.post<SolicitudCredito>(this.apiUrl, solicitud);
  }

  actualizar(id: number, solicitud: SolicitudCredito): Observable<SolicitudCredito> {
    return this.http.put<SolicitudCredito>(`${this.apiUrl}/${id}`, solicitud);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
