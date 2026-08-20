import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private hostBase = environment.apiUrl + '/ejercicios/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  public getEjercicios(): Observable<any> {
    return this._http.get(this.hostBase, this.getAuthHeaders());
  }

  public createEjercicio(datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.post(this.hostBase, body, this.getAuthHeaders());
  }

  public editEjercicio(id: number, datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.put(this.hostBase + id, body, this.getAuthHeaders());
  }

  public deleteEjercicio(id: number): Observable<any> {
    return this._http.delete(this.hostBase + id, this.getAuthHeaders());
  }
}