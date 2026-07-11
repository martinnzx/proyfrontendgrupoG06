import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private hostBase = 'http://localhost:3000/api/rutinas/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  public getRutinas(idUsuario?: number, idEjercicio?: number): Observable<any> {
    let parametros = new HttpParams();
    
    if (idUsuario) {
      parametros = parametros.append('idUsuario', idUsuario);
    }
    if (idEjercicio) {
      parametros = parametros.append('idEjercicio', idEjercicio);
    }
    
    return this._http.get(this.hostBase, { 
      headers: this.getAuthHeaders().headers, 
      params: parametros 
    });
  }

  public getMisRutinas(): Observable<any> {
    return this._http.get(this.hostBase + 'mis-rutinas', this.getAuthHeaders());
  }

  public createRutina(datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.post(this.hostBase, body, this.getAuthHeaders());
  }

  public editRutina(id: number, datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.put(this.hostBase + id, body, this.getAuthHeaders());
  }

  public deleteRutina(id: number): Observable<any> {
    return this._http.delete(this.hostBase + id, this.getAuthHeaders());
  }

  public setEjercicios(rutinaId: number, ejerciciosIds: number[]): Observable<any> {
    const headers = this.getAuthHeaders();
    return this._http.post(`${this.hostBase}setEjercicios`, { rutinaId, ejerciciosIds }, headers);
  }

  public generarRutinaIA(nombre: string, ejercicios: string[]): Observable<any> {
    const headers = this.getAuthHeaders();
    return this._http.post(`http://localhost:3000/api/ai/generar-rutina`, { nombre, ejercicios }, headers);
  }
}