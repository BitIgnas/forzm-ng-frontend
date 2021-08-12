import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authSerivce: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean  {
    if(this.authSerivce.getJwtToken() != null && this.authSerivce.getRefreshToken() != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  
}
