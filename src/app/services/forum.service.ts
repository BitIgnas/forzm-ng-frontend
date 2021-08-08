import { RefreshService } from './refresh.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../models/forum';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(
    private httpClient: HttpClient,
    private refreshService: RefreshService
  ) { }

  private baseUrl = environment.baseUrl;

  getAllForums(): Observable<Forum[]> {
    return this.httpClient.get<Forum[]>(`${this.baseUrl}/api/forum/all`)
      .pipe(
        shareReplay()
      );
  }

  createForum(forum: Forum): Observable<Forum> {
    return this.httpClient.post<Forum>(`${this.baseUrl}/api/forum/save`, forum)
      .pipe(
        tap(() => {
          this.refreshService.refresh();
        })
      );
  }

  deleteForum(forum: Forum): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/api/forum/delete`, { body: forum })
      .pipe(
        tap(() => {
          this.refreshService.refresh();
        })
      );
  }

  findForumByName(name: string): Observable<Forum> {
    return this.httpClient.get<Forum>(`${this.baseUrl}/api/forum/${name}`);
  }
}
