import { CommentResponse } from './../../../models/comment-response';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed-comment-list',
  templateUrl: './feed-comment-list.component.html',
  styleUrls: ['./feed-comment-list.component.scss']
})
export class FeedCommentListComponent implements OnInit {

  userComments$: Observable<CommentResponse[]>;
  userUsername: string;

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.userUsername = this.authService.getUsernameFromLocalStorage();
    this.userComments$ = this.commentService.getAllUserCommentsByUsername(this.userUsername);

  }

}
