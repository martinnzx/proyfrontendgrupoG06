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

  idUsuario: string = '';
  detalle : any ;
  idTarifa: string = '';
  aPagar: string = '';
  anio: string = '';
  mes: string = '';




  constructor(
    private tarifaService: TarifaService,
    private mpService: MercadoPagoService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {
     this.detalle = [] as any[];
     this.idUsuario = '';
     this.idTarifa = '';
     this.aPagar = '';
     this.anio = '';
     this.mes = '';

  }

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
 
  pagarConMP(tarifa: Tarifa) {
    const idTarifa = String(tarifa.id);
    const aPagar = tarifa.precio;
    const anio = tarifa.anio;
    const mes = tarifa.mes;

    sessionStorage.setItem('montoPago', aPagar);

    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/pago-exitoso`;

    const payload = {
      title: 'Cuota GYM' + ' ' + anio + '-' + mes,
      quantity: 1,
      price: parseFloat(aPagar),
      currency: 'ARS',
      description: 'Pago de cuota de venta correspondiente a ' + anio + '-' + mes,
      external_reference: idTarifa,
      back_urls: {
        success: successUrl,
        failure: successUrl,
        pending: successUrl
      }
    };

    this.mpService.getLinkPago(payload).subscribe({
      next: (res) => {
        if (res.init_point) {
          window.location.href = res.init_point;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al crear el link de pago:', err);
      }
    });
  }


}
