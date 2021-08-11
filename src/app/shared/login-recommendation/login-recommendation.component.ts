import { AuthService } from './../../services/auth.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { LoginStateService } from 'src/app/services/login-state.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-recommendation',
  templateUrl: './login-recommendation.component.html',
  styleUrls: ['./login-recommendation.component.scss']
})
export class LoginRecommendationComponent implements OnInit {
  @Input() text: string;
  isLoggedIn: boolean;

  constructor(
    private loginStateService: LoginStateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkIfUserRegister();
  }

  checkIfUserRegister() {
    if(this.authService.getJwtToken() != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}
