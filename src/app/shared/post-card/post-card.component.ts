
import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/models/post-response';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: PostResponse;

  constructor() { }

  ngOnInit(): void {
    
  }

}
