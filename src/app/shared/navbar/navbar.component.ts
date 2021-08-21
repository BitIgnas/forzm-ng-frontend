import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { User } from './../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  isLoggedIn: boolean;
  user: User;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkIfUserLoggedIn();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  checkIfUserLoggedIn() {
    if(this.authService.getJwtToken() != null && this.authService.getRefreshToken() != null) {
      this.isLoggedIn = true;
      this.subs.sink = this.authService.getCurrentUserFromAuthToken().subscribe(
        (authUser: User) => {
          this.user = authUser;
        }
      )
    } else {
      this.isLoggedIn = false;
    }
  }

  logoutUser() {
    this.subs.sink = this.authService.logout().subscribe();
    this.isLoggedIn = false;
  }

}
