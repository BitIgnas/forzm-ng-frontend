import { DeleteStateService } from './../../../services/delete-state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ForumResponse } from './../../../models/forum-response';
import { SubSink } from 'subsink';
import { ForumService } from '../../../services/forum.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-forum-subforums',
  templateUrl: './forum-subforums.component.html',
  styleUrls: ['./forum-subforums.component.scss']
})
export class ForumSubforumsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  forumName: string;
  forum: ForumResponse;
  isUserLoggedIn: boolean;
  isUserForum: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private forumService: ForumService,
    private deleteState: DeleteStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activatedRouter.params.subscribe(
      (params) => {
        this.forumName = params['forum-name'];
      }
    );

    this.checkIfUserLoggedIn();
    this.getForumSubForums();
    this.checkIfForumIsUsers();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getForumSubForums() {
    this.subs.sink = this.forumService.findForumByName(this.forumName).subscribe(
      (forum: ForumResponse) => {
        this.forum = forum;
        },
        (error) => {
          this.router.navigate(['**']);
        }
    );
  }

  checkIfForumIsUsers() {
    return this.forumService.checkIfForumIsUsers(this.forumName, this.authService.getUsernameFromLocalStorage())
      .subscribe(
        (response: boolean) => {
          if(response) {
            this.isUserForum = true;
            this.deleteState.setDeleteRequestStatus(true);
          }
        },
        (error) => {
          this.isUserForum = false;
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
