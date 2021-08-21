import { PostResponse } from './../models/post-response';
import { RefreshService } from './refresh.service';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostPayload } from '../models/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient,
    private refreshService: RefreshService
  ) { }

    private baseUrl = environment.baseUrl;

  addPost(post: PostPayload): Observable<PostPayload> {
    return this.httpClient.post<PostPayload>(`${this.baseUrl}/api/post/save`, post)
      .pipe(
        tap(() => {
          this.refreshService.refresh();
        })
      )
  }

  getAllPostsByForumAndByType(forumName: string, postType: string): Observable<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.baseUrl}/api/post/${forumName}/${postType}/all`);
  }

  findByPostTitleAndId(postName: string, postId: number): Observable<PostResponse> {
    return this.httpClient.get<PostResponse>(`${this.baseUrl}/api/post/${postName}/${postId}`);
  }

  getPostCountByForumName(forumName: string): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/api/post/${forumName}/posts/count`);
  }

  getPostCountByUsername(username: string): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/api/post/user/${username}/posts/count`);
  }
} 
