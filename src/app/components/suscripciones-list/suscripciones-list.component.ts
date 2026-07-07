import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuscripcionService } from '../../services/suscripcion.service';
import { UsuarioService } from '../../services/usuario.service';
import { Suscripcion } from '../../models/suscripcion.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-suscripciones-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suscripciones-list.component.html',
  styleUrl: './suscripciones-list.component.css'
})
export class SuscripcionesListComponent implements OnInit {

  suscripciones: Suscripcion[] = [];
  usuarios: Usuario[] = [];
  cargando: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  suscripcionForm: FormGroup;
  modoEdicion: boolean = false;
  suscripcionSeleccionadaId: number | null = null;

  constructor(
    private suscripcionService: SuscripcionService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.suscripcionForm = this.fb.group({
      usuarioId: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (resUsu: any) => {
        if (resUsu.status === '1') this.usuarios = resUsu.usuarios;
        
        this.suscripcionService.getSuscripciones().subscribe({
          next: (resSusc: any) => {
            this.suscripciones = resSusc;
            this.cargando = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.suscripcionSeleccionadaId = null;
    
    const hoy = new Date();
    const proximoMes = new Date();
    proximoMes.setMonth(hoy.getMonth() + 1);
    
    this.suscripcionForm.reset({
      activo: true,
      usuarioId: '',
      fecha_inicio: hoy.toISOString().split('T')[0],
      fecha_fin: proximoMes.toISOString().split('T')[0],
      precio: ''
    });
  }

  abrirModalEditar(susc: Suscripcion): void {
    this.modoEdicion = true;
    this.suscripcionSeleccionadaId = susc.id;
    this.suscripcionForm.patchValue({
      usuarioId: susc.usuario?.id,
      fecha_inicio: susc.fecha_inicio,
      fecha_fin: susc.fecha_fin,
      precio: susc.precio,
      activo: susc.activo
    });
  }

  guardarSuscripcion(): void {
    if (this.suscripcionForm.invalid) return;

    const formVals = this.suscripcionForm.value;
    const datosParaBackend = {
      fecha_inicio: formVals.fecha_inicio,
      fecha_fin: formVals.fecha_fin,
      precio: String(formVals.precio),
      activo: formVals.activo,
      usuario: { id: Number(formVals.usuarioId) }
    };

    if (this.modoEdicion && this.suscripcionSeleccionadaId) {
      this.suscripcionService.editSuscripcion(this.suscripcionSeleccionadaId, datosParaBackend).subscribe({
        next: (response: any) => {
          if (response.status === '1') {
            this.mensajeExito = 'Suscripción actualizada.';
            this.cargarDatos();
          } else { this.mensajeError = response.msg; }
          this.cdr.detectChanges();
        }
      });
    } else {
      this.suscripcionService.createSuscripcion(datosParaBackend).subscribe({
        next: (response: any) => {
          if (response.status === '1') {
            this.mensajeExito = 'Suscripción creada.';
            this.cargarDatos();
          } else { this.mensajeError = response.msg; }
          this.cdr.detectChanges();
        }
      });
    }
  }

  cambiarEstado(susc: Suscripcion): void {
    const datos = {
      ...susc,
      activo: !susc.activo,
      usuario: { id: susc.usuario?.id }
    };
    
    this.suscripcionService.editSuscripcion(susc.id, datos).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = `Suscripción ${datos.activo ? 'activada' : 'inactivada'}.`;
          this.cargarDatos();
        }
        this.cdr.detectChanges();
      }
    });
  }

  eliminarSuscripcion(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta suscripción? (Si tiene un pago asociado, el backend no te dejará)')) return;

    this.suscripcionService.deleteSuscripcion(id).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Suscripción eliminada.';
          this.cargarDatos();
        } else {
          this.mensajeError = response.msg;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.error && err.error.msg) {
          this.mensajeError = err.error.msg;
        } else {
          this.mensajeError = 'Error al eliminar.';
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