import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  constructor() { }

  private userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userUsername: BehaviorSubject<string> = new BehaviorSubject("");

  setUserLoginStatus(isLoggedIn: boolean) {
    this.userLoggedIn.next(isLoggedIn);
  }

  getUserLoginStatus$() {
    return this.userLoggedIn.asObservable();
  }

  setUserUsername(username: string) {
    this.userUsername.next(username);
  }

  getUserUsername$() {
    return this.userUsername.asObservable();
  }

  clearUserUsername() {
    this.userUsername.next("");
  }
}
