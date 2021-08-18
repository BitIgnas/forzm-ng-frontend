import { CommentResponse } from './../models/comment-response';
import { PostPayload } from './../models/post-payload';
import { PostResponse } from './../models/post-response';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentPayload } from '../models/comment-payload';
import { RefreshService } from './refresh.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    private refreshService: RefreshService
  ) { }

  private baseUrl: string = environment.baseUrl;

  addComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.httpClient.post<CommentPayload>(`${this.baseUrl}/api/comment/save`, commentPayload)
      .pipe(
        tap(() => {
          this.refreshService.refresh();
        })
      )
  }

  findAllPostComments(postTitle: string, postId: number): Observable<CommentResponse[]> {
    return this.httpClient.get<CommentResponse[]>(`${this.baseUrl}/api/comment/${postTitle}/${postId}`);
  }

}
