import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private hostBase = 'http://localhost:3000/api/youtube/';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
  }

  public buscarVideos(query: string): Observable<any> {
    return this._http.get(this.hostBase + 'buscar?q=' + encodeURIComponent(query), this.getAuthHeaders());
  }
}
