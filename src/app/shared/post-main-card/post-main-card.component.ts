import { AuthService } from 'src/app/services/auth.service';
import { PostResponse } from './../../models/post-response';
import { SubSink } from 'subsink';
import { PostService } from './../../services/post.service';
import { ForumService } from './../../services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-main-card',
  templateUrl: './post-main-card.component.html',
  styleUrls: ['./post-main-card.component.scss']
})
export class PostMainCardComponent implements OnInit {
  @Input() post: PostResponse;
  userLoggedIn: boolean;
  

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.getJwtToken != null) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }

    console.log('testas' + this.post)
  }

}
