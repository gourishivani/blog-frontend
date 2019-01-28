import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostSaveComponent } from './post/post-save/post-save.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { UnauthenticatedUserRouteGuardService } from './service/unauthenticated-user-route-guard.service';

const routes: Routes = [
  // Allow anonymous users to access the following routes
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterUserComponent, canActivate:[UnauthenticatedUserRouteGuardService]},
  { path: 'login', component: LoginComponent, canActivate:[UnauthenticatedUserRouteGuardService]},
  { path: 'home', redirectTo: '/users'},
  { path: 'users', component: UserListComponent},
  { path: 'users/:id/posts', component: PostListComponent},
  { path: 'posts/:postId', component: PostDetailComponent},

  // User needs to be logged in for the following routes
  { path: 'createPost', component: PostSaveComponent, canActivate:[RouteGuardService] },
  { path: 'myposts', redirectTo: '/users/:userId/posts/:postId', canActivate:[RouteGuardService] },
  { path: 'myaccount', redirectTo: '/users/:id', canActivate:[RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  
  // { path: 'users/:id/posts/:id/comments', component: CommentsComponent, canActivate:[RouteGuardService] },
  // { path: 'users/:id/posts', component: TodoComponent, canActivate:[RouteGuardService] },
  // <a [routerLink]="['/users', user.id, 'posts', post.id]">
  { path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
