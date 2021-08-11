import { Observable } from 'rxjs';
import { RefreshService } from './../../../services/refresh.service';
import { ForumService } from './../../../services/forum.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumResponse } from 'src/app/models/forum-response';

@Component({
  selector: 'app-forum-all',
  templateUrl: './forum-all.component.html',
  styleUrls: ['./forum-all.component.scss']
})
export class ForumAllComponent implements OnInit {

  forums$: Observable<ForumResponse[]>;
  forumNumber: number;
  page: number = 1;

  constructor(
    private forumService: ForumService,
    private refreshService: RefreshService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshService.getRefresh()
      .subscribe(() => {
        this.displayAllForums();
      }
    );

    this.getForumNumberCount();
    this.displayAllForums();
  }

  displayAllForums() {
    this.forums$ = this.forumService.getAllForums();
  }

  getForumNumberCount() {
    this.forumService.getAllForums().subscribe(
      (data) => {
        this.forumNumber = data.length;
      }
    )
  }

}
