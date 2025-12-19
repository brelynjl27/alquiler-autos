import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { ChatIaComponent } from './chat-ia.component';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule, ChatIaComponent, NgChartsModule]
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  loading = true;

 
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Solicitudes por mes',
        backgroundColor: '#42A5F5', 
        borderRadius: 6,
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' },
      title: {
        display: true,
        text: '📈 Solicitudes registradas por mes',
        font: { size: 16 }
      }
    },
    scales: {
      x: { title: { display: true, text: 'Meses' } },
      y: { title: { display: true, text: 'Cantidad' }, beginAtZero: true }
    }
  };

  constructor(private ds: DashboardService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.ds.getSummary().subscribe({
      next: s => {
        this.summary = s;
        this.updateChart();
        this.loading = false;
      },
      error: e => {
        console.error('Error al cargar el dashboard:', e);
        this.loading = false;
      }
    });
  }

  private updateChart(): void {
    
    const datos = this.summary?.solicitudesPorMes ?? [
      { mes: 'Enero', total: 12 },
      { mes: 'Febrero', total: 8 },
      { mes: 'Marzo', total: 15 },
      { mes: 'Abril', total: 10 }
    ];

    this.barChartData.labels = datos.map(d => d.mes);
    this.barChartData.datasets[0].data = datos.map(d => d.total);
  }
}
