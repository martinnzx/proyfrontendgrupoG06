import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/pago.model';

@Component({
  selector: 'app-pagos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css'
})
export class PagosListComponent implements OnInit {

  pagos: Pago[] = [];
  cargando: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private pagoService: PagoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.pagoService.getPagos().subscribe({
      next: (res: any) => {
        this.pagos = res;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  anularPago(id: number): void {
    if (!confirm('ATENCIÓN: Anular este pago volverá a marcar la cuota como IMPAGA. ¿Estás seguro?')) return;

    this.pagoService.anularPago(id).subscribe({
      next: (response: any) => {
        if (response.status === '1') {
          this.mensajeExito = 'Pago anulado. La cuota volvió a estar impaga.';
          this.cargarDatos();
        } else {
          this.mensajeError = response.msg;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensajeError = err.error?.msg || 'Error al anular el pago.';
        this.cdr.detectChanges();
      }
    });
  }

  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
