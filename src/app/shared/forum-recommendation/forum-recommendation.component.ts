import { AuthService } from './../../services/auth.service';
import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginStateService } from 'src/app/services/login-state.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-forum-recommendation',
  templateUrl: './forum-recommendation.component.html',
  styleUrls: ['./forum-recommendation.component.scss']
})
export class ForumRecommendationComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService
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
