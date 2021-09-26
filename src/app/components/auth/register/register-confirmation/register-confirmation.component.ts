import { RegistrationStorageService } from './../../../../services/registration-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VerificationService } from './../../../../services/verification.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { tap } from 'rxjs/operators';
import { RegisterStateService } from 'src/app/services/register-state.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterPayload } from 'src/app/models/register-payload';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class RegisterConfirmationComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  registerPayload: RegisterPayload;
  apiErrorMessage: string;

  username: string;
  email: string;

  constructor(
    private registerState: RegisterStateService,
    private verificationService: VerificationService,
    private registrationStorage: RegistrationStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
 
    this.subs.sink = this.registerState.getUser().subscribe(
      (data: RegisterPayload) => {
        this.registerPayload = data;
      },
      tap(clear => {
        this.registerState.clearUser();
      })
    );
    
    this.username = this.registrationStorage.getRegisteredUsernameFromLocalStorage();
    this.email = this.registrationStorage.getRegisteredEmailFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  resendVerification() {
    this.verificationService.resendUserVerificationEmail(
      this.registrationStorage.getRegisteredUsernameFromLocalStorage(),
      this.registrationStorage.getRegisteredEmailFromLocalStorage())
      .subscribe(
        (data) => {
          
        },
        (error: HttpErrorResponse) => {
          if(error.status === 429) {
            this.apiErrorMessage = "Email limit reached. Please confirm your account";
          }
        }
      )
  }
}
