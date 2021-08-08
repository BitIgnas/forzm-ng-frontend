import { Forum } from './../../models/forum';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss']
})
export class ForumCardComponent implements OnInit {
  @Input() forum: Forum;

  constructor() { }

  ngOnInit(): void {
  }

}
