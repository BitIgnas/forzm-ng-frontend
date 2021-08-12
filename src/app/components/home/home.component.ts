import { filter, map } from 'rxjs/operators';
import { ForumService } from './../../services/forum.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ForumResponse } from 'src/app/models/forum-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  forums$: Observable<ForumResponse[]>;

  constructor(
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.forums$ = this.forumService.getAllForums().pipe(
      map(forums => forums.filter(forum => forum.imageUrl != null))
    );
  }

}
