import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages:Message[];
  constructor(
    private msgService:MessageService
  ) { }

  ngOnInit() {
  this.msgService.getMessage().subscribe(
    (messages:Message[])=>{
      this.messages=messages
    },
    (err)=>{
      console.error(err)
    }
  )
  }

}
