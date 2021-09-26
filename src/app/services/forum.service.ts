import { PostResponse } from './../models/post-response';
import { RefreshService } from './refresh.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { ForumPayload } from '../models/forum-payload';
import { ForumResponse } from '../models/forum-response';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(
    private httpClient: HttpClient,
    private refreshService: RefreshService
  ) { }

  private baseUrl = environment.baseUrl;

  getAllForums(): Observable<ForumResponse[]> {
    return this.httpClient.get<ForumResponse[]>(`${this.baseUrl}/api/forum/all`)
      .pipe(
        shareReplay()
      );
  }

  createForum(forum: ForumPayload): Observable<ForumResponse> {
    return this.httpClient.post<ForumResponse>(`${this.baseUrl}/api/forum/save`, forum)
      .pipe(
        tap(() => {
          this.refreshService.refresh();
        })
      );
  }

  deleteForum(forumName: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/api/forum/${forumName}/delete`)
      .pipe(
        tap(() => {
          this.refreshService.refresh();
        })
      );
  }

  checkIfForumIsUsers(forumName: string, username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/api/forum/${forumName}/user/${username}`);
  }

  findForumByName(name: string): Observable<ForumResponse> {
    return this.httpClient.get<ForumResponse>(`${this.baseUrl}/api/forum/${name}`);
  }

  findForumsByNameIgnoreCase(name: String): Observable<ForumResponse[]> {
    return this.httpClient.get<ForumResponse[]>(`${this.baseUrl}/api/forum/${name}/search`);
  }

  findAllUserForums(username: string): Observable<ForumResponse[]> {
    return this.httpClient.get<ForumResponse[]>(`${this.baseUrl}/api/forum/${username}/forums`);
  }

  findAllForumsByForumGameType(gameType: string): Observable<ForumResponse[]> {
    return this.httpClient.get<ForumResponse[]>(`${this.baseUrl}/api/forum/type/${gameType}`);
  }

  findAllForumsByNameAndForumGameType(name: string, gameType: string): Observable<ForumResponse[]> {
      return this.httpClient.get<ForumResponse[]>(`${this.baseUrl}/api/forum/${name}/${gameType}/search`);
  }
}
