import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NutricionService {

  private apiUrl = environment.apiUrl + '/nutricion';

  constructor(
    private _http: HttpClient,
    private loginService: LoginService
  ) { }

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.loginService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  public buscarAlimentos(query: string): Observable<any> {
    const options = this.getAuthHeaders();
    return this._http.get(`${this.apiUrl}/buscar?q=${encodeURIComponent(query)}`, options);
  }
}
