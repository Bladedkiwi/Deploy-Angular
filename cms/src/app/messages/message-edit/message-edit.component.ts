import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Message} from '../message.model';

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
  @Output() msgCreated = new EventEmitter<Message>();
  @Output() msgCleared = new EventEmitter();

  @ViewChild('userMsg', {static: true}) userMsg: ElementRef;
  @ViewChild('userSubject', {static: true}) userSubject: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onMessageSend(): void {
    this.msgCreated.emit(
      new Message(
        5,
        this.userSubject.nativeElement.value,
        this.userMsg.nativeElement.value,
        'Captain Awesome'));
  }

  onMessageClear(): void {
    this.userMsg.nativeElement.value = '';
    this.userSubject.nativeElement.value = '';


  }
}
