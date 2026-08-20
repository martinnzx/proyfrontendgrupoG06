import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private hostBase = environment.apiUrl + '/mp/';

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
    return this.http.post(environment.apiUrl + '/mp/payment', data, this.getAuthHeaders());
  }


}
 