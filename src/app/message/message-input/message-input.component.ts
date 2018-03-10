import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  editMessage:Message;
  constructor(
    private msgService:MessageService
  ) { }

  ngOnInit() {
    this.msgService.messageForEdit.subscribe(
      (message:Message)=>{this.editMessage=message}
    )
  }

  onSubmit(f:NgForm){
    if(!this.editMessage){
      // creating
      let newMsg = new Message(f.value.content,'aditya')
      this.msgService.addMessage(newMsg).subscribe(
        (result)=>{
          console.log(result.message);
          this.msgService.pushMessage(new Message(result.obj.content,result.obj.user.firstName,result.obj._id,result.obj.user._id));
        },
        (err)=>{console.error(err)}
      )

    }else{
      // editing
      this.editMessage.content = f.value.content;
      this.msgService.updateMessage(this.editMessage).subscribe(
        (result)=>{console.log(result)},
        (err)=>{console.error(err)}
      )
      this.editMessage = null;
    }
    f.reset();
  }
}
