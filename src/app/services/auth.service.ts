import { LoginStateService } from './login-state.service';
import { RefreshToken } from './../models/refresh-token';
import { LoginPayload } from '../models/login-payload';
import { AuthenticationResponse } from '../models/authentication-response'
import { Observable } from 'rxjs';
import { RegisterPayload } from 'src/app/models/register-payload';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private loginStateService: LoginStateService
  ) { }

  private baseUrl = environment.baseUrl;
  private refreshToken: RefreshToken;
    
  register(registerPayload: RegisterPayload): Observable<any> {
      return this.httpClient.post<void>(`${this.baseUrl}/api/auth/register`, registerPayload, {observe: 'response'})
      .pipe(
        map(data => {
          return data.status 
        }));
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/auth/login`, loginPayload).pipe(
      map((authResponse: AuthenticationResponse) => {
        this.localStorageService.store("authenticationToken", authResponse.authenticationToken);
        this.localStorageService.store("refreshToken", authResponse.refreshToken);
        this.localStorageService.store("expiresAt", authResponse.expiresAt);
        this.localStorageService.store("username", authResponse.username);

        this.loginStateService.setUserUsername(loginPayload.username);
        this.loginStateService.setUserLoginStatus(true);
        return true;
      })
    );
  }

  refresAuthenticationToken(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/auth/token/refresh`, this.getRefreshToken).pipe(
      tap(clear => {
        this.localStorageService.clear("authenticationToken");
        this.localStorageService.clear("expiresAt");
      }),
      map((authResponse: AuthenticationResponse) => {
        this.localStorageService.store("authenticationToken", authResponse.authenticationToken);
        this.localStorageService.store("refreshToken", authResponse.refreshToken);
        this.localStorageService.store("expiresAt", authResponse.expiresAt);
        this.localStorageService.store("username", authResponse.username);
      })
    )
  }

  logOut(): void {
    this.httpClient.post<any>(`${this.baseUrl}/api/auth/logout`, this.getRefreshToken()).subscribe();
  }

  getRefreshToken() {
    return this.refreshToken = {
      refreshToken: this.getRefreshTokenFromLocalStorage(),
      username: this.getUsernameFromLocalStorage()
    }
  }

  getRefreshTokenFromLocalStorage() {
    return this.localStorageService.retrieve("refreshToken");
  }

  getUsernameFromLocalStorage() {
    return this.localStorageService.retrieve("username");
  }

  getJwtToken() {
    return this.localStorageService.retrieve('authenticationToken');
  }
}
