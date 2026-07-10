import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutricionService } from '../../services/nutricion.service';

@Component({
  selector: 'app-nutricion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nutricion.component.html',
  styleUrl: './nutricion.component.css'
})
export class NutricionComponent {

  terminoBusqueda: string = '';
  alimentos: any[] = [];
  cargando: boolean = false;
  mensajeError: string = '';
  busquedaRealizada: boolean = false;

  constructor(
    private nutricionService: NutricionService,
    private cdr: ChangeDetectorRef
  ) {}

  buscar() {
    if (!this.terminoBusqueda.trim()) return;

    this.cargando = true;
    this.mensajeError = '';
    this.alimentos = [];
    this.busquedaRealizada = true;

    this.nutricionService.buscarAlimentos(this.terminoBusqueda).subscribe({
      next: (res) => {
        this.cargando = false;
        if (res.status === '1') {
          this.alimentos = res.data;
        } else {
          this.mensajeError = res.msg;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.error?.msg || 'Error al conectar con el servidor.';
        this.cdr.detectChanges();
      }
    });
  }
}
