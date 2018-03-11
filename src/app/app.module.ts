import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { LoadingBarHttpModule } from "@ngx-loading-bar/http";
import { MessageModule } from "./message/message.module";
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from './errors/error.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoadingBarHttpModule,
    AuthModule,
    AppRouting,
    MessageModule,
  ],
  providers: [
    AuthService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
