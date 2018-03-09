import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  @Input() message:Message;

  constructor(
    private msgService:MessageService
  ) { }

  ngOnInit() {
  }

  onEdit(){
    this.msgService.messageForEdit.emit(this.message);
  }

  onDelete(){
    this.msgService.deleteMessage(this.message).subscribe(
      (result)=>{console.log(result)},
      (err)=>console.error(err)
    )
  }
}
