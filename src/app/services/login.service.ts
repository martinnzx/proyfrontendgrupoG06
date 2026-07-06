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

  public login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify({ email, password });
    return this._http.post(this.hostBase + 'login', body, httpOptions);
  }

  public saveSession(token: string, email: string, id: number): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('id', String(id));
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  
  public getEmail(): string | null {
    return sessionStorage.getItem('email');
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
  
}