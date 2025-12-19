import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-chat-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.css']
})
export class ChatIaComponent {
  input = '';
  messages: { from: 'user' | 'bot'; text: string }[] = [];
  private ds = inject(DashboardService);

  send() {
    const text = (this.input || '').trim();
    if (!text) return;

    this.messages.push({ from: 'user', text });
    this.input = '';
    this.respond(text);
  }

  private respond(text: string) {
    const lower = text.toLowerCase();

    this.ds.getSummary().subscribe(s => {
      
      if (lower.includes('auto') && (lower.includes('cuantos') || lower.includes('disponible'))) {
        this.messages.push({
          from: 'bot',
          text: `Actualmente hay ${s.autosDisponibles ?? 'varios'} autos disponibles de un total de ${s.totalAutos}. 🚗`
        });
        return;
      }

     
      if (lower.includes('cliente')) {
        this.messages.push({
          from: 'bot',
          text: `Hay ${s.totalClientes} clientes registrados en el sistema. 👥`
        });
        return;
      }

  
      if (lower.includes('solicitud') || lower.includes('credito') || lower.includes('crédito')) {
        this.messages.push({
          from: 'bot',
          text: `Se registran ${s.totalSolicitudes} solicitudes de crédito actualmente. 📄`
        });
        return;
      }


      if (lower.includes('monto') || lower.includes('total de créditos') || lower.includes('total de creditos')) {
        this.messages.push({
          from: 'bot',
          text: `El monto total de las solicitudes registradas es de S/ ${s.totalMontoSolicitudes?.toFixed(2) ?? 0}. 💰`
        });
        return;
      }


      if (lower.includes('resumen') || lower.includes('estado general') || lower.includes('dashboard')) {
        this.messages.push({
          from: 'bot',
          text:
            `📊 *Resumen general del sistema:*\n` +
            `• Autos: ${s.totalAutos}\n` +
            `• Clientes: ${s.totalClientes}\n` +
            `• Solicitudes: ${s.totalSolicitudes}\n` +
            `• Monto total de créditos: S/ ${s.totalMontoSolicitudes?.toFixed(2) ?? 0}`
        });
        return;
      }


      this.messages.push({
        from: 'bot',
        text: 'No entendí tu consulta. Puedes preguntar, por ejemplo: “resumen general”, “autos disponibles” o “clientes registrados”. 🤖'
      });
    });
  }
}
