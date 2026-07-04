import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private _http: HttpClient) {}

  public getUsuarios(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };

    return this._http.get('http://localhost:3000/api/usuarios', httpOptions);
  }
}