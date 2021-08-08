import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginStateService } from 'src/app/services/login-state.service';

@Component({
  selector: 'app-forum-recommendation',
  templateUrl: './forum-recommendation.component.html',
  styleUrls: ['./forum-recommendation.component.scss']
})
export class ForumRecommendationComponent implements OnInit, OnDestroy {
  private sub = new SubSink();
  isLoggedIn: boolean;

  constructor(
    private loginStateService: LoginStateService
  ) { }

  ngOnInit(): void {
    this.checkIfUserRegister();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkIfUserRegister() {
    this.sub.sink = this.loginStateService.getUserLoginStatus$().subscribe(
      (isLogged: boolean) => {
        if(isLogged) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    )
  }

}
