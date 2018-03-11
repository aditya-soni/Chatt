import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { AuthRoutingModule } from "./auth.routes.module";

// import { AuthComponent } from './auth.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from "./sign-out.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        // AuthRoutingModule
    ],
    exports: [],
    declarations: [
        LogInComponent,
        SignUpComponent,
        SignOutComponent,
    ],
    providers: [],
})
export class AuthModule { }
