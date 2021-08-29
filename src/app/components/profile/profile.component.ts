import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from './../../services/comment.service';
import { PostService } from './../../services/post.service';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForumResponse } from 'src/app/models/forum-response';
import { tap, retry, retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  userForums$: Observable<ForumResponse[]>;
  user: User;
  page: number = 1;
  forumCount: number;
  postCount: number;
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
        this.getUserForums();
        this.getUserForumCount();
        this.getUserPostCount();
        this.getUserCommentCount();
      }
    )
  }

  getUserForums() {
    this.userForums$ = this.forumService.findAllUserForums(this.user.username);
  }

  getUserForumCount() {
    this.subs.sink = this.forumService.findAllUserForums(this.user.username).subscribe(
      (forums) => {
        this.forumCount = forums.length;
      }
    )
  }

  getUserPostCount() {
    this.postService.getPostCountByUsername(this.user.username).subscribe(
      (postCount) => {
        this.postCount = postCount;
      } 
    )
  }

  getUserCommentCount() {
    this.commentService.getCommentPostCount(this.user.username).subscribe(
      (commentCount) => {
        this.commentCount = commentCount;
      } 
    )
  }

}
