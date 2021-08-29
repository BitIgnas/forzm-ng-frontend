import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForumResponse } from 'src/app/models/forum-response';
import { ForumService } from 'src/app/services/forum.service';
import { LoginStateService } from 'src/app/services/login-state.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forums$: Observable<ForumResponse[]>;

  constructor(
    private forumService: ForumService,
    private postService: PostService,
    private toastr: ToastrService,
    private loginState: LoginStateService
  ) { }

  ngOnInit() {
    this.forums$ = this.forumService.getAllForums().pipe(
      map(forums => forums.filter(forum => forum.imageUrl != null))
    );
  }

}
