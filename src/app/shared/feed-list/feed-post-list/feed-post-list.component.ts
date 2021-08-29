import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed-post-list',
  templateUrl: './feed-post-list.component.html',
  styleUrls: ['./feed-post-list.component.scss']
})
export class FeedPostListComponent implements OnInit {

  userPosts$: Observable<PostResponse[]>;
  userUsername: string;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.userUsername = this.authService.getUsernameFromLocalStorage();
    this.userPosts$ = this.postService.getAllUserRecentPosts(this.userUsername);
  }
}
