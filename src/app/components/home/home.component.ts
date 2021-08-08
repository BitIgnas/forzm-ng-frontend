import { ForumService } from './../../services/forum.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  forums$: Observable<Forum[]>;

  constructor(
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.forums$ = this.forumService.getAllForums();
  }

}
