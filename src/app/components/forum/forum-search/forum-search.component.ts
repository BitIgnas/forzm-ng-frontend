import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ForumResponse } from 'src/app/models/forum-response';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-forum-search',
  templateUrl: './forum-search.component.html',
  styleUrls: ['./forum-search.component.scss']
})
export class ForumSearchComponent implements OnInit {
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
    this.displayAllForums();
  }

  displayAllForums() {
      this.activatedRouter.params.subscribe(
        (params) => {
          if(this.activatedRouter.snapshot.params['forum-name'] === "all") {
            this.forums$ = this.forumService.getAllForums()
              .pipe(
                tap(() => {
                  this.getForumNumberCount();
                })
              )
          } else if(this.activatedRouter.snapshot.params['forum-name']) {
            this.forums$ = this.forumService.findForumsByNameIgnoreCase(params['forum-name'])
              .pipe(
                tap(() => {
                  this.getForumsByNameIgnoreCaseCount(params['forum-name']);
                })
              )
          }
        }
      )
  }

  getForumNumberCount() {
    this.subs.sink = this.forumService.getAllForums().subscribe(
      (data) => {
        this.forumNumber = data.length;
      },
      tap(() => {
        this.refreshService.refresh();
      })
    )
  }

  getForumsByNameIgnoreCaseCount(name: String) {
    this.subs.sink = this.forumService.findForumsByNameIgnoreCase(name).subscribe(
      (data) => {
        this.forumNumber = data.length;
      },
      tap(() => {
        this.refreshService.refresh();
      })
    )
  }

}
