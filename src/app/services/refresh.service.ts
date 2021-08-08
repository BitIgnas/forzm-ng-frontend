import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  constructor() { }

  refreshNeeded = new Subject<void>();

  getRefresh() {
    return this.refreshNeeded;
  }

  refresh() {
    this.refreshNeeded.next();
  }
}
