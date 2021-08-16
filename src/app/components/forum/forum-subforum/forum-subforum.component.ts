import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';
import { ForumResponse } from 'src/app/models/forum-response';
import { ForumService } from './../../../services/forum.service';
import { PostResponse } from './../../../models/post-response';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forum-subforum',
  templateUrl: './forum-subforum.component.html',
  styleUrls: ['./forum-subforum.component.scss']
})
export class ForumSubforumComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  posts$: Observable<PostResponse[]>
  forumName: string;
  forum: ForumResponse;
  isUserLoggedIn: boolean;
  postType: string;
  post: PostResponse;
  
  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forumName = this.activatedRouter.snapshot.params['forum-name'];
    this.postType = this.activatedRouter.snapshot.params['sub-forum'];

    this.checkIfUserLoggedIn();
    this.validateForumSubForumParam(this.postType);
    this.checkIfForumExists(this.forumName);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getAllPostsByForum(forumName: string, postType: string) {
      this.posts$ = this.postService.getAllPostsByForumAndByType(forumName, postType.toUpperCase());
  }

  checkIfForumExists(forumName: string) {
    this.subs.sink = this.forumService.findForumByName(this.forumName).subscribe(
      (forum: ForumResponse) => {
       this.getAllPostsByForum(this.forumName, this.postType);
       this.forum = forum;
      },
      (err) => {
        this.router.navigate(['/**'])
      }
    )
  }

  validateForumSubForumParam(subforumParam: string) {
    let subforums: Array<string> = ["discussion", "help", "news", "updates"];

    this.subs.sink = this.activatedRouter.params.subscribe(
      (params: Params) => {
        if(subforums.includes(params['sub-forum'])) {
          this.postType = params['sub-forum'];
        } else {
          this.router.navigate(['/**']);
        }
      }
    )
  }

  checkIfUserLoggedIn() {
    if(this.authService.getJwtToken() != null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }
}
