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
    return this._http.get('http://localhost:3001/api/message')
              .map((respone:Response)=>{
                const messages = respone.json().obj;
                const modifiedMessages:Message[]=[];
                for(let message of messages){
                  modifiedMessages.push(new Message(message.content,'Dummy',message._id,null));
                }
                this.messages = modifiedMessages;
                return modifiedMessages;
              }).catch(
                (err:Response) => Observable.throw(err)
              )
  }

  addMessage(message:Message){
    // this.messages.push(message);
    return this._http.post('http://localhost:3001/api/message',{content:message.content})
            .map((response:Response)=>{
              return response.json()
            }).catch((error:Response)=>Observable.throw(error));
  }

  updateMessage(message:Message){
    return this._http.patch(`http://localhost:3001/api/message/${message.messageId}`,{content : message.content})
            .map((response:Response)=>{
              return response.json().message;
            })
            .catch((err:Response)=>Observable.throw(err));
  }

  deleteMessage(message:Message){
    this.messages.splice(this.messages.indexOf(message),1);
    return this._http.delete(`http://localhost:3001/api/message/${message.messageId}`)
            .map((response:Response)=>{
              return response.json().message
            }).catch(
              (err:Response)=>Observable.throw(err)
            )
  }
}
