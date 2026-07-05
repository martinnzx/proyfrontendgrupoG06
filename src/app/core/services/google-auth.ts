declare var google: any;

import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private ngZone = inject(NgZone);

  // ── Estado del usuario autenticado con Google ──
  private currentUserSubject = new BehaviorSubject<GoogleUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // ── Client ID de Google ──
  private googleClientId = '718292008970-ggtuq8rpgtcdj9mmtpitlbv4777sp6ri.apps.googleusercontent.com';

  // ── Indicador de carga del script de Google ──
  private scriptLoaded = false;

  constructor() {
    this.loadGoogleScript();
  }

  /** Carga el script de Google Identity Services */
  private loadGoogleScript(): void {
    if (this.scriptLoaded) return;
    if (document.getElementById('google-gsi-script')) {
      this.scriptLoaded = true;
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.scriptLoaded = true;
    };
    document.head.appendChild(script);
  }

  /**
   * @param buttonContainerId 
   */
  initializeGoogleSignIn(buttonContainerId: string): void {
    const tryInit = () => {
      if (typeof google === 'undefined' || !google?.accounts?.id) {
        setTimeout(tryInit, 100);
        return;
      }

      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleResponse(response),
      });

      const container = document.getElementById(buttonContainerId);
      if (container) {
        google.accounts.id.renderButton(container, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 320,
        });
      }
    };

    tryInit();
  }

  /** Procesa la respuesta de Google tras el inicio de sesión */
  private handleGoogleResponse(response: any): void {
    const token = response.credential;
    const userData = this.decodeJwt(token);

    // TODO: Conectar con backend Node.js
    // Aquí se debe enviar el token (response.credential) al backend para
    // validarlo y crear/obtener la sesión del usuario. Ejemplo:
    //
    // this.http.post('/api/auth/google', { token }).subscribe(backendResponse => {
    //   // Guardar el token del backend, manejar sesión, etc.
    // });

    // Por ahora simulamos la sesión directamente con los datos del JWT
    this.ngZone.run(() => {
      this.currentUserSubject.next(userData);
    });
  }

  /**
   * Decodifica un JWT de Google para extraer los datos del usuario.
   * NOTA: Esto es solo para simulación en frontend.
   * La validación real del token se debe hacer en el backend.
   */
  private decodeJwt(token: string): GoogleUser {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
  }

  /** Cierra la sesión del usuario y revoca el auto-select de Google */
  signOut(): void {
    this.currentUserSubject.next(null);
    if (typeof google !== 'undefined' && google?.accounts?.id) {
      google.accounts.id.disableAutoSelect();
    }
  }
}
