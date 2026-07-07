import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private hostBase = 'http://localhost:3000/api/roles/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  // Obtener roles de un usuario
  public getRolesByUsuario(dni: string): Observable<any> {
    return this._http.get(this.hostBase + 'usuario/' + dni, this.getAuthHeaders());
  }

  // Asignar un rol
  public assignRolToUsuario(dni: string, nombreRol: string): Observable<any> {
    return this._http.post(this.hostBase + 'usuario/' + dni + '/rol/' + nombreRol, {}, this.getAuthHeaders());
  }

  // Quitar un rol
  public removeRolFromUsuario(dni: string, nombreRol: string): Observable<any> {
    return this._http.delete(this.hostBase + 'usuario/' + dni + '/rol/' + nombreRol, this.getAuthHeaders());
  }
}
