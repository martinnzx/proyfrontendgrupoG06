import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/auth/";
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
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('id', String(id));
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('rol', rol);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public getRol(): string | null {
    return sessionStorage.getItem('rol');
  }
  
  public getEmail(): string | null {
    return sessionStorage.getItem('email');
  }

  public getNombre(): string | null {
    return sessionStorage.getItem('nombre');
  }

  // Logout
  public logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('rol');
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  // Register
  public register(nombre: string, apellido: string, dni: string, email: string, password: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  const body = JSON.stringify({ nombre, apellido, dni, email, password });
  
  return this._http.post('http://localhost:3000/api/usuarios/', body, httpOptions);
  }

  
}