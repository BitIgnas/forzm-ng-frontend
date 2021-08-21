import { SubSink } from 'subsink';
import { ForumStateService } from './../../services/forum-state.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forum-created-card',
  templateUrl: './forum-created-card.component.html',
  styleUrls: ['./forum-created-card.component.scss']
})
export class ForumCreatedCardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  status: boolean = false;

  constructor(
    private forumState: ForumStateService
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.forumState.getCreatedStatus().subscribe(
      (status: boolean) => {
        if(status) {
          this.status = true;

        setTimeout(()=>{                       
          this.status = false;
          }, 5000);
        } else {
          this.status = false;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  


}
