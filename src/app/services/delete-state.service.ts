import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { RegisterPayload } from '../models/register-payload';

@Injectable({
  providedIn: 'root'
})
export class DeleteStateService {

  private deleteRequest: Subject<boolean> = new BehaviorSubject(false);

  constructor() { }

  setDeleteRequestStatus(status: boolean) {
    this.deleteRequest.next(status)
  }

  getDeleteRequestStatus() {
    return this.deleteRequest.asObservable();
  }
}
