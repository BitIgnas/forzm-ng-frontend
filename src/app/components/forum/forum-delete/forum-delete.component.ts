import { DeleteStateService } from './../../../services/delete-state.service';
import { ForumResponse } from 'src/app/models/forum-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-forum-delete',
  templateUrl: './forum-delete.component.html',
  styleUrls: ['./forum-delete.component.scss']
})
export class ForumDeleteComponent implements OnInit {
  forum: ForumResponse;
  forumName: string;

  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private deleteState: DeleteStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forumName = this.activatedRouter.snapshot.params['forum-name'];
    this.findForumByName();

  }

  findForumByName() {
    this.forumService.findForumByName(this.forumName).subscribe(
      (forum) => {
        this.forum = forum;
      }
    )
  }

  deleteForum() {
    this.forumService.deleteForum(this.forum.name).subscribe(
      (response) => {
        this.router.navigate(['/forum/all'])
      }
    );
  }

}
