import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from "../message.service";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

/**
 * MessageEditComponent
 * Displays a form to add a new message to the messages list
 */
export class MessageEditComponent implements OnInit {
  // @Output() msgCreated = new EventEmitter<Message>();
  // @Output() msgCleared = new EventEmitter();

  @ViewChild('userMsg', {static: true}) userMsg: ElementRef;
  @ViewChild('userSubject', {static: true}) userSubject: ElementRef;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onMessageSend(): void {
    // Grab the new id for this message, and add in the user generated values
    // Id is max of messages
    // Message created is the max of contacts id

    // this.msgCreated.emit(
    //   new Message(
    //     '6',
    //     this.userSubject.nativeElement.value,
    //     this.userMsg.nativeElement.value,
    //     '5'));
    // this.onMessageClear();
    console.log('messageSend function fired');
    this.messageService.addMessageToList(new Message('0', this.userSubject.nativeElement.value, this.userMsg.nativeElement.value, 'Bruce Banner'));
    this.onMessageClear();
  }

  onMessageClear(): void {
    this.userMsg.nativeElement.value = '';
    this.userSubject.nativeElement.value = '';


  }
}
