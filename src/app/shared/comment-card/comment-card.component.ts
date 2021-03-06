import { CommentResponse } from './../../models/comment-response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: CommentResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
