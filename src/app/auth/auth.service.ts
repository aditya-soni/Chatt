import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class AuthService {
    constructor(
        private _http : Http,
        private errorService:ErrorService
    ) {}

    signUpUser(user:User){
        // var suser = {firstname : user.firstName, last}
        return this._http.post('/api/user',user)
                .map((response:Response)=>{
                    return response.json().message;
                }).catch(
                    (err)=> {
                        this.errorService.errorHandle(err.json());
                        return Observable.throw(err.json())}
                )
    }

    signInUser(email,password){
        return this._http.post('/api/user/login',{email,password})
                .map((response:Response)=>{
                    return response.json()
                }).catch(
                    (err)=> {
                        this.errorService.errorHandle(err.json());
                        return Observable.throw(err.json())}
                )
    }

    logOutUser(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !==null;
    }

}
