import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifaService } from '../../services/tarifa.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { LoginService } from '../../services/login.service';
import { Tarifa } from '../../models/tarifa.model';

@Component({
  selector: 'app-mis-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pagos.html',
})
export class MisPagosComponent implements OnInit {
  misTarifas: Tarifa[] = [];
  cargando: boolean = true;
  generandoLinkMP: boolean = false;
  mensajeError: string = '';

  constructor(
    private tarifaService: TarifaService,
    private mpService: MercadoPagoService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMisTarifas();
  }

  cargarMisTarifas(): void {
    this.cargando = true;
    this.tarifaService.getMisTarifas().subscribe({
      next: (res: any) => {
        this.misTarifas = res;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Error al cargar tus cuotas.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  pagarConMP(tarifa: Tarifa): void {
    this.mensajeError = '';
    this.generandoLinkMP = true;

    const title = `Cuota ${tarifa.mes}/${tarifa.anio} - GymHub`;
    const description = `Pago mensual. Suscripción #${tarifa.suscripcion?.id}`;
    const precio = Number(tarifa.precio);
    const email = this.loginService.getEmail() || 'usuario@gymhub.com';

    this.mpService.generarLinkPago(title, description, precio, email).subscribe({
      next: (res: any) => {
        this.generandoLinkMP = false;
        if (res && res.init_point) {
          window.open(res.init_point, '_blank');
        } else {
          this.mensajeError = 'Error al generar link de MercadoPago.';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.generandoLinkMP = false;
        this.mensajeError = 'Error de conexión con MercadoPago.';
        this.cdr.detectChanges();
      }
    });
  }
}
