import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/models/post-response';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  username: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromLocalStorage();
  }
  

}
