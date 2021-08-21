import { BehaviorSubject } from 'rxjs';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumStateService {
  
  private createdForum = new BehaviorSubject<boolean>(false);

  getCreatedStatus() {
    return this.createdForum.asObservable();
  }

  setCreate() {
    this.createdForum.next(true);
  }

  deleteCreate() {
    this.createdForum.next(false);
  }

  constructor() { }

}
