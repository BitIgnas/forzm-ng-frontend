import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class RegistrationStorageService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  saveRegisteredUserUsernameAndEmail(username: string, email: string) {
    this.localStorageService.store("registration-username", username);
    this.localStorageService.store("registration-email", email);
  }

  getRegisteredUsernameFromLocalStorage(): string {
    return this.localStorageService.retrieve("registration-username");
  }

  getRegisteredEmailFromLocalStorage(): string {
    return this.localStorageService.retrieve("registration-email");
  }

  clearRegisteredUserUsernameAndEmail() {
    this.localStorageService.clear("registration-username");
    this.localStorageService.clear("registration-email");
  }
}
