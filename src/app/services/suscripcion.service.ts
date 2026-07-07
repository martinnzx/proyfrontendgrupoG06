import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  private hostBase = 'http://localhost:3000/api/suscripciones/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  public getSuscripciones(): Observable<any> {
    return this._http.get(this.hostBase, this.getAuthHeaders());
  }

  public createSuscripcion(datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.post(this.hostBase, body, this.getAuthHeaders());
  }

  public editSuscripcion(id: number, datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.patch(this.hostBase + id, body, this.getAuthHeaders());
  }

  public deleteSuscripcion(id: number): Observable<any> {
    return this._http.delete(this.hostBase + id, this.getAuthHeaders());
  }
}