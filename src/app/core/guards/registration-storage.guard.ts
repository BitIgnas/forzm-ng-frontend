import { RegistrationStorageService } from './../../services/registration-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationStorageGuard implements CanActivate {

  constructor(
    private registrationStorage: RegistrationStorageService,
    private router: Router
  ) {}

  canActivate(): boolean  {
    if(this.registrationStorage.getRegisteredUsernameFromLocalStorage() != null &&
     this.registrationStorage.getRegisteredUsernameFromLocalStorage() != null) {
       return true;
     } else {
      this.router.navigate(['/register/user']);
     }
  }
  
}
