import { SubSink } from 'subsink';
import { Forum } from 'src/app/models/forum';
import { ForumService } from '../../../services/forum.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-forum-subforums',
  templateUrl: './forum-subforums.component.html',
  styleUrls: ['./forum-subforums.component.scss']
})
export class ForumSubforumsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  forumName: string;
  forum: Forum;

  constructor(
    private activatedRouter: ActivatedRoute,
    private forumService: ForumService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activatedRouter.params.subscribe(
      (params) => {
        this.forumName = params['forum-name'];
      }
    );

    this.getForumSubForums();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getForumSubForums() {
    this.subs.sink = this.forumService.findForumByName(this.forumName).subscribe(
      (forum: Forum) => {
        this.forum = forum;
        },
        (error) => {
          this.router.navigate(['**']);
        }
    );
  }

}
