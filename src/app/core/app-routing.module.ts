import { ForumAllComponent } from './../components/forum/forum-all/forum-all.component';

import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from '../components/auth/register/register-form/register.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterGuard } from './guards/register-guard.guard';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';
import { LoginFormComponent } from '../components/auth/login/login-form/login-form.component';

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
  { path: 'forum/all', component: ForumAllComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
