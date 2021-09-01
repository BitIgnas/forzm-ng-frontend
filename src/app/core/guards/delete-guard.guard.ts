import { DeleteStateService } from './../../services/delete-state.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeleteGuardGuard implements CanActivate {

  constructor(
    private deleteState: DeleteStateService,
    private router: Router
  ) {}

  
  canActivate(): Observable<boolean> {
    return this.deleteState.getDeleteRequestStatus().pipe(
      map((status) => {
          if(status) {
            return true;
          } else {
            this.router.navigate(['/forum/all']);
          }
      })     
    )
  }
}
