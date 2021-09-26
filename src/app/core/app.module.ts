import { RegistrationStorageGuard } from './guards/registration-storage.guard';
import { CreatePostImageComponent } from './../components/post/create-post-image/create-post-image.component';
import { ForumDeleteComponent } from './../components/forum/forum-delete/forum-delete.component';
import { ForumCardComponent } from './../shared/forum-card/forum-card.component';
import { RouterModule } from '@angular/router';
import { FeedCommentListComponent } from './../shared/feed-list/feed-comment-list/feed-comment-list.component';
import { FeedPostListComponent } from './../shared/feed-list/feed-post-list/feed-post-list.component';
import { FeedComponent } from './../components/feed/feed.component';
import { CommentListCardComponent } from './../shared/comment-list-card/comment-list-card.component';
import { CommentListComponent } from './../shared/profile-list/comment-list/comment-list.component';
import { PostListComponent } from './../shared/profile-list/post-list/post-list.component';
import { ForumCreatedCardComponent } from './../shared/forum-created-card/forum-created-card.component';
import { ProfileComponent } from './../components/profile/profile.component';
import { ForumSearchCardComponent } from './../shared/forum-search-card/forum-search-card.component';
import { ForumSearchComponent } from './../components/forum/forum-search/forum-search.component';
import { CommentCardComponent } from './../shared/comment-card/comment-card.component';
import { QuillTextEditorComponent } from './../shared/quill-text-editor/quill-text-editor.component';
import { CreatePostComponent } from './../components/post/create-post/create-post.component';
import { ForumCreateFormComponent } from './../components/forum/forum-create-form/forum-create-form.component';
import { ForumDescriptionComponent } from './../shared/forum-description/forum-description.component';
import { PageNotFoundComponent } from './../shared/page-not-found/page-not-found.component';
import { PostCardComponent } from './../shared/post-card/post-card.component';
import { ForumSubforumsComponent } from '../components/forum/forum-subforum-all/forum-subforums.component';
import { LoginRecommendationComponent } from './../shared/login-recommendation/login-recommendation.component';
import { ForumRecommendationComponent } from './../shared/forum-recommendation/forum-recommendation.component';
import { ForumAllComponent } from './../components/forum/forum-all/forum-all.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/auth/register/register-form/register.component';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from '../components/progress/progress.component';
import { RegisterGuard } from './guards/register-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgFileValidatorLibModule } from 'angular-file-validator';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';
import { LoginFormComponent } from '../components/auth/login/login-form/login-form.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ForumSubforumComponent } from '../components/forum/forum-subforum/forum-subforum.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { LoginGuard } from './guards/login-guard.guard';
import { ForumSubforumPostComponent } from '../components/post/forum-subforum-post/forum-subforum-post.component';
import { QuillModule } from 'ngx-quill';
import { HtmlToTextPipe } from './pipes/html-to-text.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumListComponent } from '../shared/profile-list/forum-list/forum-list.component';
import { ProfileChangeAvatarComponent } from '../shared/profile-change-avatar/profile-change-avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterProfileComponent,
    DndDirective,
    ProgressComponent,
    ForumAllComponent,
    RegisterConfirmationComponent,
    ForumCardComponent,
    ForumRecommendationComponent,
    LoginRecommendationComponent,
    ForumSubforumsComponent,
    ForumSubforumComponent,
    PostCardComponent,
    PageNotFoundComponent,
    ForumDescriptionComponent,
    ForumCreateFormComponent,
    ForumSubforumPostComponent,
    CreatePostComponent,
    QuillTextEditorComponent,
    HtmlToTextPipe,
    CommentCardComponent,
    ForumSearchComponent,
    ForumSearchCardComponent,
    ProfileComponent,
    ForumCreatedCardComponent,
    ForumListComponent,
    PostListComponent,
    CommentListComponent,
    CommentListCardComponent,
    FeedComponent,
    FeedPostListComponent,
    FeedCommentListComponent,
    ProfileChangeAvatarComponent,
    ForumDeleteComponent,
    CreatePostImageComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RxReactiveFormsModule,
    QuillModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    RegisterGuard, 
    RegistrationStorageGuard,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
