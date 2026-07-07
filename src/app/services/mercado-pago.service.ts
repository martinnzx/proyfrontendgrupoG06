import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private hostBase = 'http://localhost:3000/api/mp/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  /**
   * Genera un link de pago en MercadoPago Checkout Pro.
   * @param title       Titulo que ve el comprador en MP (ej: "Cuota Marzo 2024")
   * @param description Descripcion del pago
   * @param unit_price  Monto a cobrar (numero)
   * @param payer_email Email del socio que paga
   */
  public generarLinkPago(title: string, description: string, unit_price: number, payer_email: string): Observable<any> {
    const body = JSON.stringify({ title, description, unit_price, payer_email });
    return this._http.post(this.hostBase + 'payment', body, this.getAuthHeaders());
  }
}
