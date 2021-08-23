import { CommentResponse } from './../../../models/comment-response';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumResponse } from 'src/app/models/forum-response';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ForumService } from 'src/app/services/forum.service';
import { PostService } from 'src/app/services/post.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  private subs = new SubSink();

  userComments$: Observable<CommentResponse[]>;
  user: User;
  page: number = 1;
  commentCount: number;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.getCurrentUserStats();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCurrentUserStats() {
    this.subs.sink = this.authService.getCurrentUserFromAuthToken().subscribe(
      (authUser: User) => {
        this.user = authUser;
        this.getUserComments(authUser.username);
        this.getUserCommentCount();
      }
    )
  }

  getUserComments(username: string) {
    this.userComments$ = this.commentService.getAllUserCommentsByUsername(username);
  }

  getUserCommentCount() {
    this.subs.sink = this.commentService.getCommentPostCount(this.user.username).subscribe(
      (commentCount) => {
        this.commentCount = commentCount;
      } 
    )
  }

}
