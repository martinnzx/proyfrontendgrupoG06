import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinaService } from '../../services/rutina.service';
import { UsuarioService } from '../../services/usuario.service';
import { EjercicioService } from '../../services/ejercicio.service';
import { Rutina } from '../../models/rutina.model';
import { Usuario } from '../../models/usuario.model';
import { Ejercicio } from '../../models/ejercicio.model';

@Component({
  selector: 'app-rutinas-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rutinas-list.component.html',
  styleUrl: './rutinas-list.component.css'
})
export class RutinasListComponent implements OnInit {

  rutinas: Rutina[] = [];
  usuarios: Usuario[] = [];
  ejercicios: Ejercicio[] = [];

  cargando: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  rutinaForm: FormGroup;
  modoEdicion: boolean = false;
  rutinaSeleccionadaId: number | null = null;

  constructor(
    private rutinaService: RutinaService,
    private usuarioService: UsuarioService,
    private ejercicioService: EjercicioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.rutinaForm = this.fb.group({
      dia_semana: ['', [Validators.required]],
      turno: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      activo: [true],
      usuarioId: ['', [Validators.required]],
      ejercicioId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarDatosFormulario();
    this.cargarRutinas();
  }

  cargarDatosFormulario(): void {
    this.usuarioService.getSocios().subscribe({
      next: (res: any) => {
        if (res.status === '1') this.usuarios = res.usuarios;
      }
    });

    this.ejercicioService.getEjercicios().subscribe({
      next: (ejercicios: any) => {
        this.ejercicios = ejercicios;
      }
    });
  }

  cargarRutinas(): void {
    this.cargando = true;
    this.rutinaService.getRutinas().subscribe({
      next: (rutinas: any) => {
        this.cargando = false;
        this.rutinas = rutinas;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Error al cargar las rutinas.';
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.rutinaSeleccionadaId = null;
    this.rutinaForm.reset({ activo: true, dia_semana: '', turno: '', usuarioId: '', ejercicioId: '' });
  }

  abrirModalEditar(rutina: Rutina): void {
    this.modoEdicion = true;
    this.rutinaSeleccionadaId = rutina.id;
    this.rutinaForm.patchValue({
      dia_semana: rutina.dia_semana,
      turno: rutina.turno,
      nombre: rutina.nombre,
      descripcion: rutina.descripcion,
      activo: rutina.activo,
      usuarioId: (rutina as any).usuarioId,
      ejercicioId: (rutina as any).ejercicioId
    });
  }

  guardarRutina(): void {
    if (this.rutinaForm.invalid) return;

    const formVals = this.rutinaForm.value;
    const datosParaBackend = {
      dia_semana: formVals.dia_semana,
      turno: formVals.turno,
      nombre: formVals.nombre,
      descripcion: formVals.descripcion,
      activo: formVals.activo,
      usuario: { id: Number(formVals.usuarioId) },
      ejercicio: { id: Number(formVals.ejercicioId) }
    };

    if (this.modoEdicion && this.rutinaSeleccionadaId) {
      this.rutinaService.editRutina(this.rutinaSeleccionadaId, datosParaBackend).subscribe({
        next: (response: any) => {
          if (response.status === '1') {
            this.mensajeExito = 'Rutina modificada.';
            this.cargarRutinas();
          } else { this.mensajeError = response.msg; }
          this.cdr.detectChanges();
        }
      });
    } else {
      this.rutinaService.createRutina(datosParaBackend).subscribe({
        next: (response: any) => {
          if (response.status === '1') {
            this.mensajeExito = 'Rutina creada con éxito.';
            this.cargarRutinas();
          } else { this.mensajeError = response.msg; }
          this.cdr.detectChanges();
        }
      });
    }
  }

  cambiarEstado(rutina: Rutina): void {
    const datos = {
      ...rutina,
      activo: !rutina.activo,
      usuario: { id: (rutina as any).usuarioId },
      ejercicio: { id: (rutina as any).ejercicioId }
    };
    
    this.rutinaService.editRutina(rutina.id, datos).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = `Rutina ${datos.activo ? 'activada' : 'inactivada'}.`;
          this.cargarRutinas();
        }
        this.cdr.detectChanges();
      }
    });
  }

  eliminarRutina(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta rutina?')) return;

    this.rutinaService.deleteRutina(id).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Rutina eliminada.';
          this.cargarRutinas();
        }
        this.cdr.detectChanges();
      }
    });
  }

  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}