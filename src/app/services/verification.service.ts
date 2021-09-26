import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private baseUrl: string = environment.baseUrl;

  resendUserVerificationEmail(username: string, email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/verify/user/${username}/email/${email}/resend`, null);
  }
}
