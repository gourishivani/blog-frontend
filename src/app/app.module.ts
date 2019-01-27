import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostSaveComponent } from './post-save/post-save.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AlertComponent } from './alert/alert.component';
import { ApiEndPoint } from './models/ApiEndPoint';

@NgModule({
  // Components, pipes and directives are declared here
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    UserListComponent,
    PostListComponent,
    PostDetailComponent,
    PostSaveComponent,
    RegisterUserComponent,
    AlertComponent
  ],
  // Add all the modules here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiEndPoint],
  bootstrap: [AppComponent]
})
export class AppModule { }
