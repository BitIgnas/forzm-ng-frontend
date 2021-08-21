import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { LoginStateService } from 'src/app/services/login-state.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginPayload } from '../../../../models/login-payload';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginPayload: LoginPayload;
  apiErrorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loginState: LoginStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.loginPayload = {
      username: '',
      password: ''
    }
  }

  checkIfErrorExist(isPresent: boolean) {
    if(isPresent) {
      return false;
    }
  }

  onSubmit() {
    this.loginPayload.username = this.loginForm.controls['username'].value;
    this.loginPayload.password = this.loginForm.controls['password'].value;

    this.authService.login(this.loginPayload).subscribe(
      (authResponse) => {
        this.router.navigate(['/forum/all'])
        this.loginState.setUserLoginStatus(true);
        this.loginState.setUserUsername(this.authService.getUsernameFromLocalStorage());
      },(error: HttpErrorResponse) => {
        if(error.status == 403) {
          this.apiErrorMessage = 'Username or password is incorrect'
        }
      })
      
  }

}
