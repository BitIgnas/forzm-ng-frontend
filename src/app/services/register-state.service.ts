import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { RegisterPayload } from '../models/register-payload';

@Injectable({
  providedIn: 'root'
})
export class RegisterStateService {

  constructor() { }

  private registeredComplete: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private registeredUser: Subject<RegisterPayload> = new ReplaySubject(1);

  public getRegisteredComplete(): Observable<boolean> {
    return this.registeredComplete.asObservable();
  }

  public setRegisteredComplete(isRegistered: boolean): void {
     this.registeredComplete.next(isRegistered);
  }

  public setUser(registerPayload: RegisterPayload): void {
    this.registeredUser.next(registerPayload);
  }

  public clearUser(): void {
    this.registeredUser.next(null);
  } 

  public getUser(): Observable<RegisterPayload> {
    return this.registeredUser.asObservable();
  }
}
