import { LoginFormComponent } from './../components/auth/login/login-form/login-form.component';
import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from '../components/auth/register/register-form/register.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterGuard } from './guards/register-guard.guard';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home',pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'register', redirectTo: '/register/user', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'register', children: [
    { path: 'user', component: RegisterComponent},
    { path: 'profile', component: RegisterProfileComponent, canActivate: [RegisterGuard]},
    { path: 'success', component: RegisterConfirmationComponent, canActivate: [RegisterGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
