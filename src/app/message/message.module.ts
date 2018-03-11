import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MessageComponent } from './message.component';
import { MessageDetailComponent } from "./message-detail/message-detail.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        MessageComponent,
        MessageInputComponent,
        MessageListComponent,
        MessageDetailComponent,
    ],
    providers: [MessageService],
})
export class MessageModule { }
