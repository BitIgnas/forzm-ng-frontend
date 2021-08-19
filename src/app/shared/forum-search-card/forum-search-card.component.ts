import { RefreshService } from './../../services/refresh.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-search-card',
  templateUrl: './forum-search-card.component.html',
  styleUrls: ['./forum-search-card.component.scss']
})
export class ForumSearchCardComponent implements OnInit {

  forumSearchTerm: string;

  constructor(
    private refreshService: RefreshService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      (params) => {
        if(params['forum-name']) {
          this.forumSearchTerm = params['forum-name'];
        }
      },
      tap(() => {
        this.refreshService.refresh();
      })
    )
  }

  search() {
    if(this.forumSearchTerm) {
      this.router.navigate(['/forum/search/',  this.forumSearchTerm]);
    }
  }

}
