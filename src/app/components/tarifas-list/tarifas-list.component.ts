import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarifaService } from '../../services/tarifa.service';
import { SuscripcionService } from '../../services/suscripcion.service';
import { PagoService } from '../../services/pago.service';
import { Tarifa } from '../../models/tarifa.model';
import { Suscripcion } from '../../models/suscripcion.model';

@Component({
  selector: 'app-tarifas-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarifas-list.component.html',
  styleUrl: './tarifas-list.component.css'
})
export class TarifasListComponent implements OnInit {

  tarifas: Tarifa[] = [];
  suscripciones: Suscripcion[] = [];
  cargando: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  tarifaForm: FormGroup;
  pagoForm: FormGroup;
  
  tarifaSeleccionadaId: number | null = null;
  tarifaParaPagar: Tarifa | null = null;

  constructor(
    private tarifaService: TarifaService,
    private suscripcionService: SuscripcionService,
    private pagoService: PagoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.tarifaForm = this.fb.group({
      suscripcionId: ['', Validators.required],
      anio: [new Date().getFullYear().toString(), Validators.required],
      mes: [(new Date().getMonth() + 1).toString().padStart(2, '0'), Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      pagado: [false],
      activo: [true]
    });

    this.pagoForm = this.fb.group({
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      transaccion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.suscripcionService.getSuscripciones().subscribe((resSusc: any) => {
      this.suscripciones = resSusc;
      this.tarifaService.getTarifas().subscribe((resTar: any) => {
        this.tarifas = resTar;
        this.cargando = false;
        this.cdr.detectChanges();
      });
    });
  }

  abrirModalNuevo(): void {
    const hoy = new Date();
    this.tarifaForm.reset({
      suscripcionId: '',
      anio: hoy.getFullYear().toString(),
      mes: (hoy.getMonth() + 1).toString().padStart(2, '0'),
      precio: '',
      pagado: false,
      activo: true
    });
  }

  alCambiarSuscripcion(event: any): void {
    const id = Number(event.target.value);
    const suscripcion = this.suscripciones.find(s => s.id === id);
    if (suscripcion) {
      this.tarifaForm.patchValue({
        precio: suscripcion.precio
      });
    }
  }

  guardarTarifa(): void {
    if (this.tarifaForm.invalid) return;

    const formVals = this.tarifaForm.value;
    const datosParaBackend = {
      anio: String(formVals.anio),
      mes: String(formVals.mes),
      precio: String(formVals.precio),
      pagado: formVals.pagado,
      activo: formVals.activo,
      suscripcion: { id: Number(formVals.suscripcionId) }
    };

    this.tarifaService.createTarifa(datosParaBackend).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Tarifa generada con éxito.';
          this.cargarDatos();
        } else { this.mensajeError = response.msg; }
        this.cdr.detectChanges();
      }
    });
  }

  anularTarifa(id: number): void {
    if (!confirm('¿Estás seguro de anular esta tarifa?')) return;

    this.tarifaService.anularTarifa(id).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Tarifa anulada correctamente.';
          this.cargarDatos();
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensajeError = err.error?.msg || 'Error al anular la tarifa.';
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalPago(tarifa: Tarifa): void {
    this.tarifaParaPagar = tarifa;
    const hoy = new Date();
    this.pagoForm.reset({
      fecha: hoy.toISOString().split('T')[0],
      transaccion: '',
      monto: tarifa.precio
    });
  }

  registrarPago(): void {
    if (this.pagoForm.invalid || !this.tarifaParaPagar) return;

    const formVals = this.pagoForm.value;
    const datosPago = {
      fecha: formVals.fecha,
      transaccion: formVals.transaccion,
      monto: String(formVals.monto),
      activo: true,
      tarifa: { id: this.tarifaParaPagar.id }
    };

    this.pagoService.createPago(datosPago).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Pago registrado con éxito. La tarifa se marcó como pagada.';
          this.cargarDatos();
        } else { this.mensajeError = response.msg; }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensajeError = err.error?.msg || 'Error al registrar el pago.';
        this.cdr.detectChanges();
      }
    });
  }

  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
