import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(credentials: LoginCredentials): Observable<boolean> {
    console.log('Login solicitado', credentials);
    return of(true).pipe(delay(500));
  }

  register(data: RegisterData): Observable<boolean> {
    console.log('Registro solicitado', data);
    return of(true).pipe(delay(500));
  }
}
