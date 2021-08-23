import { CommentResponse } from './../../models/comment-response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-list-card',
  templateUrl: './comment-list-card.component.html',
  styleUrls: ['./comment-list-card.component.scss']
})
export class CommentListCardComponent implements OnInit {
  @Input() comment: CommentResponse;

  constructor() { }

  ngOnInit(): void {
   
  }

}
