import { RegistrationStorageGuard } from './guards/registration-storage.guard';
import { CreatePostImageComponent } from './../components/post/create-post-image/create-post-image.component';
import { DeleteGuardGuard } from './guards/delete-guard.guard';
import { ForumDeleteComponent } from './../components/forum/forum-delete/forum-delete.component';
import { FeedCommentListComponent } from './../shared/feed-list/feed-comment-list/feed-comment-list.component';
import { FeedPostListComponent } from './../shared/feed-list/feed-post-list/feed-post-list.component';
import { FeedComponent } from './../components/feed/feed.component';
import { CommentListComponent } from './../shared/profile-list/comment-list/comment-list.component';
import { PostListComponent } from './../shared/profile-list/post-list/post-list.component';
import { ForumListComponent } from './../shared/profile-list/forum-list/forum-list.component';
import { ProfileComponent } from './../components/profile/profile.component';
import { ForumSearchComponent } from './../components/forum/forum-search/forum-search.component';
import { CreatePostComponent } from './../components/post/create-post/create-post.component';
import { ForumCreateFormComponent } from './../components/forum/forum-create-form/forum-create-form.component';
import { PageNotFoundComponent } from './../shared/page-not-found/page-not-found.component';
import { ForumSubforumsComponent } from '../components/forum/forum-subforum-all/forum-subforums.component';
import { ForumAllComponent } from './../components/forum/forum-all/forum-all.component';

import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from '../components/auth/register/register-form/register.component';
import { RegisterGuard } from './guards/register-guard.guard';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';
import { LoginFormComponent } from '../components/auth/login/login-form/login-form.component';
import { ForumSubforumComponent } from '../components/forum/forum-subforum/forum-subforum.component';
import { LoginGuard } from './guards/login-guard.guard';
import { ForumSubforumPostComponent } from '../components/post/forum-subforum-post/forum-subforum-post.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: '', redirectTo: '/home',pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'register', redirectTo: '/register/user', pathMatch: 'full'},
  { path: 'register', children: [
    { path: 'user', component: RegisterComponent},
    { path: 'profile', component: RegisterProfileComponent, canActivate: [RegisterGuard]},
    { path: 'success', component: RegisterConfirmationComponent, canActivate: [RegistrationStorageGuard]}
  ]},
  { path: 'user/profile', canActivate: [LoginGuard], component: ProfileComponent, children: [
    {path: 'forums', component: ForumListComponent},
    {path: 'posts', component: PostListComponent},
    {path: 'comments', component: CommentListComponent},
    { path: 'user/profile', redirectTo: '/user/profile/forum', pathMatch: 'full'}
  ]},
  { path: 'user/feed', redirectTo: '/user/feed/posts', pathMatch: 'full'},
  { path: 'user/feed', component: FeedComponent, children: [
    {path: 'posts', component: FeedPostListComponent},
    {path: 'comments', component: FeedCommentListComponent}
  ]},
  { path: 'forum/all', component: ForumAllComponent },
  { path: 'forum/:forum-name/post/create', component: CreatePostComponent, canActivate: [LoginGuard]},
  { path: 'forum/:forum-name/post/create/img', component: CreatePostImageComponent, canActivate: [LoginGuard]},
  { path: 'forum/create', component: ForumCreateFormComponent, canActivate: [LoginGuard]},
  { path: 'forum/search', component: ForumSearchComponent},
  { path: 'forum/search/:forum-name', component: ForumSearchComponent},
  { path: 'forum/:forum-name/sub-forums', component: ForumSubforumsComponent},
  { path: 'forum/:forum-name/sub-forum/:sub-forum', component: ForumSubforumComponent},
  { path: 'forum/:forum-name/sub-forum/:sub-forum/:post-title/:post-id', component: ForumSubforumPostComponent},
  { path: 'forum/:forum-name/delete', component: ForumDeleteComponent, canActivate: [DeleteGuardGuard, LoginGuard]},
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full'},
  { path: 'page-not-found', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
