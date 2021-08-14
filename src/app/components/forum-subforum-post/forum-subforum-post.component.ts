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
  post: PostResponse;
  forumName: string;
  forumSubForum: string;
  postTitle: string;
  postId: number;

  constructor(
    private activatedRouter: ActivatedRoute,
    private forumService: ForumService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forumName = this.activatedRouter.snapshot.params['forum-name'];
    this.forumSubForum = this.activatedRouter.snapshot.params['sub-forum'];
    this.postTitle = this.activatedRouter.snapshot.params['post-title'];
    this.postId = this.activatedRouter.snapshot.params['post-id'];
    this.checkIfForumExists(this.activatedRouter.snapshot.params['forum-name']);
    this.validatePost(this.postTitle, this.postId)
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
    this.postService.findByPostTitleAndId(this.postTitle, this.postId).subscribe(
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

}
