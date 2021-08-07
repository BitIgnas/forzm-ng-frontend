
import { Observable } from 'rxjs';
import { RegisterPayload } from 'src/app/core/models/register-payload';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private baseUrl = environment.baseUrl;

  register(registerPayload: RegisterPayload): Observable<any> {
      return this.httpClient.post<void>(`${this.baseUrl}/api/auth/register`, registerPayload, {observe: 'response'})
      .pipe(
        map(data => {
          return data.status 
        }));
  }
}
