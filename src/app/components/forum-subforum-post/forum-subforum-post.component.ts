import { UtilsService } from './../../services/utils.service';
import { switchMap, tap } from 'rxjs/operators';
import { take, shareReplay } from 'rxjs/operators';
import { RefreshService } from './../../services/refresh.service';
import { CommentPayload } from './../../models/comment-payload';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from './../../services/comment.service';
import { Observable } from 'rxjs';
import { CommentResponse } from './../../models/comment-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ForumResponse } from 'src/app/models/forum-response';
import { PostResponse } from './../../models/post-response';
import { PostService } from './../../services/post.service';
import { SubSink } from 'subsink';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-subforum-post',
  templateUrl: './forum-subforum-post.component.html',
  styleUrls: ['./forum-subforum-post.component.scss']
})
export class ForumSubforumPostComponent implements OnInit {
  private subs = new SubSink();
  comments$: Observable<CommentResponse[]>
  commentPayload: CommentPayload;
  commentForm: FormGroup;
  displayForm: boolean;
  isUserLoggedIn: boolean;

  currentUser: User;
  post: PostResponse;
  forumName: string;
  forumSubForum: string;
  postTitle: string;
  postId: number;

  commentNumber: number;
  page: number = 1;

  constructor(
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private forumService: ForumService,
    private postService: PostService,
    private commentService: CommentService,
    private refreshService: RefreshService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) { 

    this.displayForm = false;
  }

  ngOnInit(): void {
    this.forumName = this.activatedRouter.snapshot.params['forum-name'];
    this.forumSubForum = this.activatedRouter.snapshot.params['sub-forum'];
    this.postTitle = this.activatedRouter.snapshot.params['post-title'];
    this.postId = this.activatedRouter.snapshot.params['post-id'];
    this.checkIfForumExists(this.activatedRouter.snapshot.params['forum-name']);
    this.validatePost(this.postTitle, this.postId)
    this.getCurrentUser();


    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });

    this.commentPayload = {
      content: '',
      postTitle: '',
      postId: null
    }

    this.comments$ = this.refreshService.refreshNeeded.pipe(
      tap(() => {
        this.getCommentCount();
      }),
      switchMap(_ =>
         this.commentService.findAllPostComments(
          this.utilsService.prepareUrlPostTitle(this.postTitle),
          this.postId
        )
      )
    )

  }

  checkIfForumExists(forumName: string) {
    this.subs.sink = this.forumService.findForumByName(forumName).subscribe(
      (forum: ForumResponse) => {
          this.forumName = forum.name;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 404 || 401) {
          this.router.navigate(['/**']);
        }
      }
    )
  }

  validatePost(postTitle: string, postId: number) {
    this.postService.findByPostTitleAndId(this.utilsService.prepareUrlPostTitle(this.postTitle), this.postId).subscribe(
      (post: PostResponse) => {
        this.post = post;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 404) {
          this.router.navigate(['/**']);
        }
      }
    )
  }
  
  getCurrentUser() {
    this.authService.getCurrentUserFromAuthToken().subscribe(
      (user: User) => {
          this.currentUser = user;
          this.isUserLoggedIn = true;
        },
        (error: HttpErrorResponse) => {
          this.isUserLoggedIn = false;
        }
    )
  }

  displayCommentBox() {
    if(!this.displayForm) {
      this.displayForm = true;
    } else if(this.displayForm) {
      this.displayForm = false;
    }
  }

  getCommentCount() {
    this.commentService.findAllPostComments(this.postTitle, this.postId).subscribe(
      (data) => {
        this.commentNumber = data.length;
      },
      tap(() => {
        this.refreshService.refresh();

      })
    )
  }

  onSubmit() {
    this.commentPayload.content = this.commentForm.controls['content'].value;
    this.commentPayload.postTitle = this.postTitle;
    this.commentPayload.postId = this.postId;

    this.commentService.addComment(this.commentPayload).pipe(
      tap(() => {
        this.commentForm.reset();
        this.displayForm = false;
      })
    ).subscribe(); 
  }

}
