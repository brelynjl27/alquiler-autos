import { Cliente } from './cliente';

export interface Auto {
  id?: number;
  marca: string;
  modelo: string;
  anio: number;
  placa:string;
  precio: number;
  cliente?: Cliente; 
}
