import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private hostBase = environment.apiUrl + '/tarifas/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  public getTarifas(): Observable<any> {
    return this._http.get(this.hostBase, this.getAuthHeaders());
  }

  public getMisTarifas(): Observable<any> {
    return this._http.get(this.hostBase + 'mis-tarifas', this.getAuthHeaders());
  }
  
  public getCuotasImpagasPorUsuario(usuarioId: number): Observable<any> {
    return this._http.get(this.hostBase + 'impagas/' + usuarioId, this.getAuthHeaders());
  }

  public createTarifa(datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.post(this.hostBase, body, this.getAuthHeaders());
  }

  public anularTarifa(id: number): Observable<any> {
    return this._http.patch(this.hostBase + id + '/anular', {}, this.getAuthHeaders());
  }
}
