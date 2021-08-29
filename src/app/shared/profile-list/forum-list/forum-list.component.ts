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
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent implements OnInit {
  private subs = new SubSink();

  userForums$: Observable<ForumResponse[]>;
  user: User;
  page: number = 1;
  forumCount: number;

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

}
