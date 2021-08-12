import { ForumCreateFormComponent } from './../components/forum/forum-create-form/forum-create-form.component';
import { PageNotFoundComponent } from './../shared/page-not-found/page-not-found.component';
import { ForumSubforumsComponent } from '../components/forum/forum-subforum-all/forum-subforums.component';
import { ForumAllComponent } from './../components/forum/forum-all/forum-all.component';

import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from '../components/auth/register/register-form/register.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterGuard } from './guards/register-guard.guard';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';
import { LoginFormComponent } from '../components/auth/login/login-form/login-form.component';
import { ForumSubforumComponent } from '../components/forum/forum-subforum/forum-subforum.component';
import { LoginGuard } from './guards/login-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: '', redirectTo: '/home',pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'register', redirectTo: '/register/user', pathMatch: 'full'},
  { path: 'register', children: [
    { path: 'user', component: RegisterComponent},
    { path: 'profile', component: RegisterProfileComponent, canActivate: [RegisterGuard]},
    { path: 'success', component: RegisterConfirmationComponent}
  ]},
  { path: 'forum/all', component: ForumAllComponent },
  { path: 'forum/create', component: ForumCreateFormComponent, canActivate: [LoginGuard]},
  { path: 'forum/:forum-name/sub-forums', component: ForumSubforumsComponent},
  { path: 'forum/:forum-name/sub-forum/:sub-forum', component: ForumSubforumComponent},
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full'},
  { path: 'page-not-found', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
