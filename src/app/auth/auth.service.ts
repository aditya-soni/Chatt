import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
    constructor(
        private _http : Http
    ) {}

    signUpUser(user:User){
        // var suser = {firstname : user.firstName, last}
        return this._http.post('http://localhost:3001/api/user',user)
                .map((response:Response)=>{
                    return response.json().message;
                }).catch(
                    err => Observable.throw(err.json())
                )
    }

    signInUser(email,password){
        return this._http.post('http://localhost:3001/api/user/login',{email,password})
                .map((response:Response)=>{
                    return response.json()
                }).catch(
                    (err)=> Observable.throw(err)
                )
    }

    logOutUser(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !==null;
    }

}
