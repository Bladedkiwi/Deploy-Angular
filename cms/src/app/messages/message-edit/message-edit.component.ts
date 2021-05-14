import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from '../message.service';
import {Ingredient} from '../../../../../cookbook/src/app/shared/ingredient.model';

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
        '6',
        this.userSubject.nativeElement.value,
        this.userMsg.nativeElement.value,
        '5'));
    this.onMessageClear();
  }

  onMessageClear(): void {
    this.userMsg.nativeElement.value = '';
    this.userSubject.nativeElement.value = '';


  }
}
