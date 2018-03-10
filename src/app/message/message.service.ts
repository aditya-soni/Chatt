import { Injectable, EventEmitter } from '@angular/core';
import { Message } from "./message.model";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessageService {
  messages:Message[]=[]
  messageForEdit = new EventEmitter<Message>();

  constructor(
    private _http : Http
  ) { }

  pushMessage(message:Message){
    this.messages.push(message);
  }

  getMessage(){
    // return this.messages;
    return this._http.get('/api/message')
              .map((respone:Response)=>{
                const messages = respone.json().obj;
                const modifiedMessages:Message[]=[];
                for(let message of messages){
                  modifiedMessages.push(new Message(message.content,message.user.firstName,message._id,message.user._id));
                }
                this.messages = modifiedMessages;
                return modifiedMessages;
              }).catch(
                (err:Response) => Observable.throw(err)
              )
  }

  addMessage(message:Message){
    // this.messages.push(message);
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.post(`/api/message/${token}`,{content:message.content})
            .map((response:Response)=>{
              return response.json()
            }).catch((error:Response)=>Observable.throw(error));
  }

  updateMessage(message:Message){
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.patch(`/api/message/${message.messageId}${token}`,{content : message.content})
            .map((response:Response)=>{
              return response.json().message;
            })
            .catch((err:Response)=>Observable.throw(err));
  }

  deleteMessage(message:Message){
    this.messages.splice(this.messages.indexOf(message),1);
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this._http.delete(`/api/message/${message.messageId}${token}`)
            .map((response:Response)=>{
              return response.json().message
            }).catch(
              (err:Response)=>Observable.throw(err)
            )
  }

  correctUser(userId){
   return localStorage.getItem('userId') == userId ? true : false
  }
}
