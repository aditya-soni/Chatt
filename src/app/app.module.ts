import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { LoadingBarHttpModule } from "@ngx-loading-bar/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { MessageComponent } from './message/message.component';
import { MessageInputComponent } from './message/message-input/message-input.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageDetailComponent } from './message/message-detail/message-detail.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignOutComponent } from "./auth/sign-out.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MessageComponent,
    MessageInputComponent,
    MessageListComponent,
    MessageDetailComponent,
    LogInComponent,
    SignUpComponent,
    SignOutComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LoadingBarHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
