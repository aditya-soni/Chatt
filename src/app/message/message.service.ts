import { Injectable, EventEmitter } from '@angular/core';
import { Message } from "./message.model";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class MessageService {
  messages:Message[]=[]
  messageForEdit = new EventEmitter<Message>();

  constructor(
    private _http : Http,
    private errorService:ErrorService
  ) { }

  pushMessage(message:Message){
    this.messages.push(message);
  }

  getMessage(){
    // return this.messages;
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.get(`/api/message${token}`)
              .map((respone:Response)=>{
                const messages = respone.json().obj;
                const modifiedMessages:Message[]=[];
                for(let message of messages){
                  modifiedMessages.push(new Message(message.content,message.user.firstName,message._id,message.user._id));
                }
                this.messages = modifiedMessages;
                return modifiedMessages;
              }).catch(
                (err:Response) => {
                  this.errorService.errorHandle(err.json());
                  return Observable.throw(err.json());
                }
              )
  }

  addMessage(message:Message){
    // this.messages.push(message);
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.post(`/api/message/${token}`,{content:message.content})
            .map((response:Response)=>{
              return response.json()
            }).catch((error:Response)=>{this.errorService.errorHandle(error.json());
              return Observable.throw(error.json())});
  }

  updateMessage(message:Message){
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.patch(`/api/message/${message.messageId}${token}`,{content : message.content})
            .map((response:Response)=>{
              return response.json().message;
            })
            .catch((err:Response)=>{
              this.errorService.errorHandle(err.json());
              return Observable.throw(err.json())});
  }

  deleteMessage(message:Message){
    this.messages.splice(this.messages.indexOf(message),1);
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.delete(`/api/message/${message.messageId}${token}`)
            .map((response:Response)=>{
              return response.json().message
            }).catch(
              (err:Response)=>{
                this.errorService.errorHandle(err.json());
                return Observable.throw(err.json())}
            )
  }

  correctUser(userId){
   return localStorage.getItem('userId') == userId ? true : false
  }
}
