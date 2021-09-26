import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ForumSearchComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  forums$: Observable<ForumResponse[]>;
  forumNumber: number;
  loggedIn: boolean;
  page: number = 1;

  forumTypeButtons: Array<string> = ["All", "FPS", "RPG", "MMO", "ADVENTURE", "STRATEGY", "FIGHTING", "SPORT", "SIMULATION", "MUSIC"];
  selectedTypeButtom: string = this.forumTypeButtons[0];

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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  displayAllForums() {
    this.subs.sink = this.activatedRouter.params.subscribe(
        (params) => {
          if(this.activatedRouter.snapshot.params['forum-name'] === "all" || "" ) {
            this.forums$ = this.forumService.getAllForums()
              .pipe(
                tap(() => {
                  this.getForumNumberCount();
                  this.page = 1;
                })
              );
          } else if(this.activatedRouter.snapshot.params['forum-name']) {
            this.forums$ = this.forumService.findForumsByNameIgnoreCase(params['forum-name'])
              .pipe(
                tap(() => {
                  this.getForumsByNameIgnoreCaseCount(params['forum-name']);
                  this.page = 1;
                })
              );
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

  displaySelectedGameTypeForums(gameType: string) {
    if(this.activatedRouter.snapshot.params['forum-name'] == "all") {
    this.forums$ = this.forumService.findAllForumsByForumGameType(gameType.toUpperCase())
        .pipe(
          tap(() => {
            this.getForumGameTypeForumCount(gameType);
          })
        );
    } else if(this.activatedRouter.snapshot.params['forum-name'] != "all") {
      this.forums$ = this.forumService.findAllForumsByNameAndForumGameType(this.activatedRouter.snapshot.params['forum-name'], gameType.toUpperCase())
      .pipe(
        tap(() => {
          this.getForumGameTypeForumCount(gameType);
        })
      );
    }
  }

  getForumGameTypeForumCount(gameType: string) {
    this.subs.sink = this.forumService.findAllForumsByForumGameType(gameType).subscribe(
      (data) => {
        this.forumNumber = data.length;
      }
    )
  }

  isButtonSelected(button: string) {
    return button === this.selectedTypeButtom;
    this.displaySelectedGameTypeForums(button);
  }

  switchButton(button: string) {
    this.selectedTypeButtom = button;
    
    if(button == "All") {
      this.displayAllForums();
      this.router.navigate(['/forum/search/all']);
    } else {
      this.displaySelectedGameTypeForums(button);
    }
 }
}
