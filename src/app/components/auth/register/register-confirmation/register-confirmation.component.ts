import { tap } from 'rxjs/operators';
import { RegisterStateService } from 'src/app/services/register-state.service';
import { Component, OnInit } from '@angular/core';
import { RegisterPayload } from 'src/app/core/models/register-payload';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class RegisterConfirmationComponent implements OnInit {

  registerPayload: RegisterPayload;

  constructor(
    private registerState: RegisterStateService
  ) { }

  ngOnInit(): void {
    this.registerPayload = {
      username: '',
      email: '',
      password:''
    }

    this.registerState.getUser().subscribe(
      (data: RegisterPayload) => {
        this.registerPayload = data;
      },
      tap(clear => {
        this.registerState.clearUser();
      })
    );
  }
}
