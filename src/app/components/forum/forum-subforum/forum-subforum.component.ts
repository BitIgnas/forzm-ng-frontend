import { ForumResponse } from 'src/app/models/forum-response';
import { ForumService } from './../../../services/forum.service';
import { PostResponse } from './../../../models/post-response';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-subforum',
  templateUrl: './forum-subforum.component.html',
  styleUrls: ['./forum-subforum.component.scss']
})
export class ForumSubforumComponent implements OnInit {
  posts$: Observable<PostResponse[]>
  forumName: string;
  forum: ForumResponse;
  postType: string;
  post: PostResponse;
  
  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forumName = this.activatedRouter.snapshot.params['forum-name'];
    this.postType = this.activatedRouter.snapshot.params['sub-forum'];
    this.checkIfForumExists(this.forumName);
  }

  getAllPostsByForum(forumName: string, postType: string) {
      this.posts$ = this.postService.getAllPostsByForumAndByType(forumName, postType.toUpperCase());
  }

  checkIfForumExists(forumName: string) {
    this.forumService.findForumByName(this.forumName).subscribe(
      (forum: ForumResponse) => {
       this.getAllPostsByForum(this.forumName, this.postType);
       this.forum = forum;
      },
      (err) => {
        this.router.navigate(['**'])
      }
    )
  }

}
