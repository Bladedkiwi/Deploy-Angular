import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';


@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // this.messageService.selectedMessageEvent.subscribe(message: Message => {
    //   this.selectedMessage = message;
    // });
  }
  onMessageSend(): void {}

}
