import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private hostBase = 'http://localhost:3000/api/usuarios/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  // Obtener todos los usuarios (requiere token + ser admin)
  public getUsuarios(): Observable<any> {
    return this._http.get(this.hostBase, this.getAuthHeaders());
  }

  // Obtener solo los socios (requiere token)
  public getSocios(): Observable<any> {
    return this._http.get(this.hostBase + 'socios/list', this.getAuthHeaders());
  }

  // Editar un usuario por DNI (requiere token + ser admin)
  public updateUsuario(dni: string, datos: any): Observable<any> {
    const body = JSON.stringify(datos);
    return this._http.put(this.hostBase + dni, body, this.getAuthHeaders());
  }

  // Eliminar un usuario por DNI (requiere token + ser admin)
  public deleteUsuario(dni: string): Observable<any> {
    return this._http.delete(this.hostBase + dni, this.getAuthHeaders());
  }

  // Cambiar estado a INACTIVO
  public inactivarUsuario(dni: string): Observable<any> {
    return this._http.patch(this.hostBase + `${dni}/inactive`, {}, this.getAuthHeaders());
  }

  // Cambiar estado a ACTIVO
  public activarUsuario(dni: string): Observable<any> {
    return this._http.patch(this.hostBase + `${dni}/active`, {}, this.getAuthHeaders());
  }
}