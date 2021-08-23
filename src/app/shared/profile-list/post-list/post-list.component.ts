import { PostResponse } from './../../../models/post-response';
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
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  private subs = new SubSink();

  userPosts$: Observable<PostResponse[]>;
  user: User;
  page: number = 1;
  postCount: number; 

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
        this.getUserPosts();
      }
    )
  }

  getUserPosts() {
    this.userPosts$ = this.postService.getAllUserPostsByUsername(this.user.username);
  }

}
