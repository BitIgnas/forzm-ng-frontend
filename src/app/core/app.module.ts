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
import { HttpClientModule } from '@angular/common/http';
import { NgFileValidatorLibModule } from 'angular-file-validator';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RegisterConfirmationComponent } from '../components/auth/register/register-confirmation/register-confirmation.component';
import { RegisterProfileComponent } from '../components/auth/register/register-profile/register-profile.component';
import { LoginFormComponent } from '../components/auth/login/login-form/login-form.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ForumCardComponent } from '../shared/forum-card/forum-card.component';
import { ForumSubforumComponent } from '../components/forum/forum-subforum/forum-subforum.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
    ForumCreateFormComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RxReactiveFormsModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [RegisterGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
