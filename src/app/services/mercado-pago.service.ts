import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private hostBase = 'http://localhost:3000/api/mp/';

  constructor(private _http: HttpClient, private http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  getLinkPago(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/mp/payment', data, this.getAuthHeaders());
  }


}
 