import { SubSink } from 'subsink';
import { PostService } from './../../services/post.service';
import { Forum } from './../../models/forum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss']
})
export class ForumCardComponent implements OnInit, OnDestroy {
  private sub = new SubSink();
  @Input() forum: Forum;
  forumPostCount: number;

  constructor(
    private postService: PostService
  ) { }
 
  ngOnInit(): void {
    this.sub.sink = this.postService.getPostCountByForumName(this.forum.name).subscribe(
      (count: number) => {
        this.forumPostCount = count;
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
