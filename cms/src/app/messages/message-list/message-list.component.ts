import {Component, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from '../message.service';
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

/**
 * MessageListComponent
 * Class Responsible for displaying the entire list of messages
 */
export class MessageListComponent implements OnInit {


  messageList: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageList = this.messageService.getMessageList();
    this.messageService.updateMessageListEvent$.subscribe((messageList: Message[]) => {
      this.messageList = messageList;
    });
  }

  // onAddMessage(message: Message): void {
  //   this.messageService.addMessageToList(message);
  // }

}
