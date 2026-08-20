import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = environment.apiUrl + "/auth/";
  }

  // Login
  public login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify({ email, password });
    return this._http.post(this.hostBase + 'login', body, httpOptions);
  }

  public saveSession(token: string, email: string, id: number, nombre: string, rol: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('id', String(id));
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('rol', rol);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getRol(): string | null {
    const rol = localStorage.getItem('rol');
    if (rol === 'null' || rol === 'undefined' || rol === '') {
      return null;
    }
    return rol;
  }
  
  public getEmail(): string | null {
    return localStorage.getItem('email');
  }

  public getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  // Logout
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Register
  public register(nombre: string, apellido: string, dni: string, email: string, password: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  const body = JSON.stringify({ nombre, apellido, dni, email, password });
  
  return this._http.post(environment.apiUrl + '/usuarios/', body, httpOptions);
  }

  // Login con Google
  public loginConGoogle(googleToken: string): Observable<any> {
    const body = { token: googleToken };
    return this._http.post(this.hostBase + 'google', body);
  }

}