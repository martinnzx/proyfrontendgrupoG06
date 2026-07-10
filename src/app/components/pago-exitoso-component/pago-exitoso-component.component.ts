
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({ 
  selector: 'app-pago-exitoso-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './pago-exitoso-component.component.html',
  styleUrl: './pago-exitoso-component.component.css',
}) 
export class PagoExitosoComponentComponent implements OnInit { 
 
  paymentId: string | null = null; 
  paymentStatus: string | null = null; 
  externalReference: string | null = null; 
  loading: boolean = true; 
  message: string = 'Procesando tu pago...'; 

  goHome(): void {
    this.router.navigate(['/home']);
  }

  private redirectToHome(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
   
  constructor(private pagoService: PagoService,  private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router,  
 private loginService: LoginService ) {} 
 
 
  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => { 
      this.paymentId = params['collection_id'] || params['payment_id']; 
      this.paymentStatus = params['collection_status'] || params['status']; 
      this.externalReference = params['external_reference']; 

      const tarifaId = parseInt(this.externalReference && this.externalReference !== 'null' ? this.externalReference : '0', 10);

      if (this.paymentId && this.paymentStatus === 'approved') {
        this.message = '¡Tu pago ha sido aprobado! Registrando pago...'; 
 
        const today = new Date().toISOString().split('T')[0];
        const montoPago = sessionStorage.getItem('montoPago') || '0';
        const data = {
          fecha: today,
          transaccion: `Pago Mercado Pago - Referencia: ${this.paymentId}`,
          monto: montoPago,
          activo: true,
          tarifa: {
            id: tarifaId
          }
        };

          this.pagoService.createPago(data).subscribe(
            
            (result: any) => {
              console.log('Pago registrado exitosamente:', result);
              this.message = '¡Tu pago ha sido registrado correctamente!';
              this.loading = false;
              this.cd.detectChanges();
              this.redirectToHome();
            },
            (error) => {
              console.error('Error al registrar el pago:', error);
              this.message = 'Pago aprobado pero hubo un error al registrar. Por favor contacta a soporte.';
              this.loading = false;
              this.cd.detectChanges();
            }
      );
      } 
      else if (this.paymentStatus === 'pending') { 
        this.message = 'Tu pago está pendiente. Te notificaremos cuando se complete.'; 
        this.loading = false; 
        this.redirectToHome();
      } else if (this.paymentStatus === 'rejected' || this.paymentStatus === 'failure') { 
        this.message = 'Tu pago ha sido rechazado. Por favor, intenta de nuevo.'; 
        this.loading = false; 
        this.redirectToHome();
      } else { 
        this.message = 'No se pudo determinar el estado del pago.'; 
        this.loading = false; 
        this.redirectToHome();
      } 
    }); 
  } 
} 