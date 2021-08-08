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

  constructor(
    private registerState: RegisterStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerPayload = {
      username: '',
      email: '',
      password:''
    }
    

    this.subs.sink = this.registerState.getUser().subscribe(
      (data: RegisterPayload) => {
        this.registerPayload = data;
      },
      tap(clear => {
        this.registerState.clearUser();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
