import { tap } from 'rxjs/operators';
import { RefreshService } from './refresh.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiStorageService {

  constructor(
    private httpClient: HttpClient,
    private refreshService: RefreshService
    ) { }

  private baseUrl = environment.baseUrl;

  uploadUserProfile(file: File, username: string): void {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${this.baseUrl}/api/storage/user/${username}/upload`, true);
    xhr.send(formData);
  }

  uploadForumImage(file: File, forumName: string): void {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${this.baseUrl}/api/storage/forum/${forumName}/upload`, true);
    xhr.send(formData);
  }

  updateUserProfile(file: File, username: string) {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${this.baseUrl}/api/storage/user/${username}/profile/update`, true);
    xhr.send(formData);
  }

  uploadPostImage(file: File, postTitle: string, postId: number): void {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${this.baseUrl}/api/storage/post/${postTitle}/id/${postId}/upload`, true);
    xhr.send(formData);
  }
}
