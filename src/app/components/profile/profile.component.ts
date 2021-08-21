import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCurrentUserStats();
  }

  getCurrentUserStats() {
    this.authService.getCurrentUserFromAuthToken().subscribe(
      (authUser: User) => {
        this.user = authUser;
      }
    )
  }

}
