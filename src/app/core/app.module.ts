import { LoginFormComponent } from './../components/auth/login/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/auth/register/register-form/register.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from '../components/progress/progress.component';
import { RegisterGuard } from './guards/register-guard.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFileValidatorLibModule } from 'angular-file-validator';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterProfileComponent,
    DndDirective,
    ProgressComponent,
    RegisterConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RxReactiveFormsModule
  ],
  providers: [RegisterGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
