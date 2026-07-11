import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EjercicioService } from '../../services/ejercicio.service';
import { Ejercicio } from '../../models/ejercicio.model';

@Component({
  selector: 'app-ejercicios-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ejercicios-list.component.html',
  styleUrl: './ejercicios-list.component.css'
})
export class EjerciciosListComponent implements OnInit {

  ejercicios: Ejercicio[] = [];
  cargando: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  ejercicioForm: FormGroup;
  modoEdicion: boolean = false;
  ejercicioSeleccionadoId: number | null = null;

  constructor(
    private ejercicioService: EjercicioService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.ejercicioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      youtube_url: ['', [Validators.required, Validators.pattern(/youtube\.com|youtu\.be/)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    this.cargando = true;
    this.ejercicioService.getEjercicios().subscribe({
      next: (response: any) => {
        this.cargando = false;
        this.ejercicios = response; 
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Error al cargar los ejercicios.';
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.ejercicioSeleccionadoId = null;
    this.ejercicioForm.reset({ activo: true });
  }

  abrirModalEditar(ejercicio: Ejercicio): void {
    this.modoEdicion = true;
    this.ejercicioSeleccionadoId = ejercicio.id;
    this.ejercicioForm.patchValue({
      nombre: ejercicio.nombre,
      descripcion: ejercicio.descripcion,
      youtube_url: ejercicio.youtube_url,
      activo: ejercicio.activo
    });
  }

  guardarEjercicio(): void {
    if (this.ejercicioForm.invalid) return;

    const datos = this.ejercicioForm.value;

    if (this.modoEdicion && this.ejercicioSeleccionadoId) {
      this.ejercicioService.editEjercicio(this.ejercicioSeleccionadoId, datos).subscribe({
        next: (response: any) => {
          if (response.status === '1') {
            this.mensajeExito = 'Ejercicio actualizado correctamente.';
            this.cargarEjercicios();
          } else {
            this.mensajeError = response.msg;
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensajeError = 'Error al actualizar el ejercicio.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.ejercicioService.createEjercicio(datos).subscribe({
        next: (response: any) => {
          if (response.status === '1') {
            this.mensajeExito = 'Ejercicio creado correctamente.';
            this.cargarEjercicios();
          } else {
            this.mensajeError = response.msg;
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensajeError = 'Error al crear el ejercicio.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  cambiarEstado(ejercicio: Ejercicio): void {
    const datosActualizados = { ...ejercicio, activo: !ejercicio.activo };
    
    this.ejercicioService.editEjercicio(ejercicio.id, datosActualizados).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = `Ejercicio ${!ejercicio.activo ? 'activado' : 'inactivado'}.`;
          this.cargarEjercicios();
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'Error al cambiar el estado.';
        this.cdr.detectChanges();
      }
    });
  }

  eliminarEjercicio(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este ejercicio? Si está en una rutina, no se podrá borrar.')) return;

    this.ejercicioService.deleteEjercicio(id).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Ejercicio eliminado.';
          this.cargarEjercicios();
        } else {
          this.mensajeError = response.msg;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.error && err.error.msg) {
          this.mensajeError = err.error.msg;
        } else {
          this.mensajeError = 'Error al eliminar el ejercicio.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  sanitizarUrl(url: string): SafeResourceUrl {
    let embedUrl = url;
    if (url.includes('watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}