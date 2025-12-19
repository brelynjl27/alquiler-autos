export interface SolicitudCredito {
  id?: number;
  clienteId: number;
  autoId: number;
  monto: number;
  estado: string; // Ej: "PENDIENTE", "APROBADO", "RECHAZADO"
  fechaSolicitud?: string;
}
