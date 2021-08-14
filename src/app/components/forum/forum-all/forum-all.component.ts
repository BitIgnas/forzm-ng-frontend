import { SubSink } from 'subsink';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { RefreshService } from './../../../services/refresh.service';
import { ForumService } from './../../../services/forum.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumResponse } from 'src/app/models/forum-response';

@Component({
  selector: 'app-forum-all',
  templateUrl: './forum-all.component.html',
  styleUrls: ['./forum-all.component.scss']
})
export class ForumAllComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  forums$: Observable<ForumResponse[]>;
  forumNumber: number;
  loggedIn: boolean;
  page: number = 1;

  constructor(
    private forumService: ForumService,
    private refreshService: RefreshService,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.refreshService.getRefresh()
      .subscribe(() => {
        this.displayAllForums();
      }
    );

    this.isUserLoggedIn();
    this.getForumNumberCount();
    this.displayAllForums();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  displayAllForums() {
    this.forums$ = this.forumService.getAllForums();
  }

  getForumNumberCount() {
    this.subs.sink = this.forumService.getAllForums().subscribe(
      (data) => {
        this.forumNumber = data.length;
      }
    )
  }

  isUserLoggedIn() {
    if(this.authService.getJwtToken() != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

}
