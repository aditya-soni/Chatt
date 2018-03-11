import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit,OnDestroy {
  messages:Message[];
  getSub :Subscription;
  constructor(
    private msgService:MessageService
  ) { }

  ngOnInit() {
    this.getSub =this.msgService.getMessage().subscribe(
    (messages:Message[])=>{
      this.messages=messages
    },
    (err)=>{
      console.error(err)
    }
  )
  }

  ngOnDestroy(){
    this.getSub.unsubscribe();
  }

}
