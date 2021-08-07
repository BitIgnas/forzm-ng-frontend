import { LoginPayload } from './../core/models/login-payload';
import { AuthenticationResponse } from '../core/models/authentication-response'
import { Observable } from 'rxjs';
import { RegisterPayload } from 'src/app/core/models/register-payload';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  private baseUrl = environment.baseUrl;

  register(registerPayload: RegisterPayload): Observable<any> {
      return this.httpClient.post<void>(`${this.baseUrl}/api/auth/register`, registerPayload, {observe: 'response'})
      .pipe(
        map(data => {
          return data.status 
        }));
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/auth/login`, loginPayload).pipe(
      map(authResponse => {
        this.localStorageService.store("authenticationToken", authResponse.authenticationToken);
        this.localStorageService.store("refreshToken", authResponse.refreshToken);
        this.localStorageService.store("dateReceived", authResponse.timeStamp);
        this.localStorageService.store("username", authResponse.username);
        return true;
      })
    ) 
  }
}
