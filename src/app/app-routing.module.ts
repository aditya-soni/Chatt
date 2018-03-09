import { NgModule } from '@angular/core';
import { Routes,RouterModule, Router } from "@angular/router";
import { MessageComponent } from "./message/message.component";
import { AuthComponent } from "./auth/auth.component";
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignOutComponent } from './auth/sign-out.component';

const appRoutes:Routes = [
    { path: '', redirectTo: '/messenger', pathMatch: 'full' },
    { path: 'messenger', component: MessageComponent },
    { path: 'auth', component: AuthComponent ,children:[
        { path: '', redirectTo : '/auth/login', pathMatch : 'full' },
        { path: 'login', component: LogInComponent },
        { path: 'signup', component: SignUpComponent },
        { path: 'logout', component: SignOutComponent },
    ] },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRouting {

}