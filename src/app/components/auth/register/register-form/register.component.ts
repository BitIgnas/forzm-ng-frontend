import { RegistrationStorageService } from './../../../../services/registration-storage.service';
import { Router } from '@angular/router';
import { RegisterPayload } from 'src/app/models/register-payload';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterStateService } from 'src/app/services/register-state.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  registerPayload: RegisterPayload
  registerForm: FormGroup;
  apiErrorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private registerState: RegisterStateService,
    private registrationStorageService: RegistrationStorageService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.buildForm();
    this.registerPayload = {
      username: '',
      email: '',
      password:''
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      confirm_password: ['', Validators.required]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const confirm_password = group.controls.confirm_password.value;

    return password === confirm_password ? null : { notSame: true };
}

  onSubmit() {
    this.registerPayload.username = this.registerForm.controls.username.value;
    this.registerPayload.email = this.registerForm.controls.email.value;
    this.registerPayload.password = this.registerForm.controls.password.value;

    this.subs.sink = this.authService.register(this.registerPayload).subscribe((response) => {
      if(response) {
        this.router.navigate(['/register/profile']);
        this.registerState.setUser(this.registerPayload);
        this.registerState.setRegisteredComplete(true);

        this.registrationStorageService.saveRegisteredUserUsernameAndEmail(
          this.registerPayload.username,
          this.registerPayload.email)
      }
  },
      (error: HttpErrorResponse) => {
        if(error.status == 409) {
          this.apiErrorMsg = 'User already exists';
      } else if(error.status == 500) {
          this.router.navigate(['/home'])
      }
    });
  }
}

