import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { RegisterStateService } from '../../services/register-state.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(
    private registerSharingService: RegisterStateService,
    private router: Router
  ) 
  {}

  canActivate(): Observable<boolean> {
    return this.registerSharingService.getRegisteredComplete().pipe(
      map((registered) => {
          if(registered) {
            return true;
          } else {
            this.router.navigate(['/register']);
          }
      })     
    )
  }
}
