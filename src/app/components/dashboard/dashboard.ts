import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  stats: any = null;
  cargando: boolean = true;
  mensajeError: string = '';

  @ViewChild('chartRoles') chartRoles!: ElementRef;
  @ViewChild('chartEstados') chartEstados!: ElementRef;
  @ViewChild('chartFinanzas') chartFinanzas!: ElementRef;

  charts: any[] = [];

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarStats();
  }

  ngAfterViewInit(): void {
    
  }

  cargarStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (res: any) => {
        if (res.status === '1') {
          this.stats = res.data;
          this.cargando = false;
          
          this.cdr.detectChanges();
          this.inicializarGraficos();
        } else {
          this.mensajeError = 'Error al obtener datos del dashboard.';
          this.cargando = false;
        }
      },
      error: () => {
        this.mensajeError = 'Error de conexión con el backend.';
        this.cargando = false;
      }
    });
  }

  inicializarGraficos(): void {
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];

    // 1. Grafico de Roles
    const chart1 = new Chart(this.chartRoles.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Administradores', 'Entrenadores', 'Socios'],
        datasets: [{
          data: [this.stats.roles.admins, this.stats.roles.entrenadores, this.stats.roles.socios],
          backgroundColor: ['#dc3545', '#ffc107', '#0d6efd'],
          hoverOffset: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    // 2. Grafico de Estados
    const chart2 = new Chart(this.chartEstados.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          data: [this.stats.usuarios.activos, this.stats.usuarios.inactivos],
          backgroundColor: ['#198754', '#6c757d'],
          hoverOffset: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    // 3. Grafico de Finanzas
    const chart3 = new Chart(this.chartFinanzas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ingresos Totales ($)'],
        datasets: [{
          label: 'Total Recaudado',
          data: [this.stats.finanzas.ingresosTotales],
          backgroundColor: ['#0dcaf0'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    this.charts.push(chart1, chart2, chart3);
  }
}
