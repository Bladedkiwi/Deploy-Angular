import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

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


  messageList: Message[] = [
    new Message(
      1,
      'Assignments',
      'How many teachers would it take to grade 300 assignments in 5 min?',
      'Bro. Saysalot'),
    new Message(
       2,
      'Assignments',
      'What about rainbows?',
      'Never Melistening'),
    new Message(
      3,
      'Assignments',
      'Never, start listening when I ask a question.',
      'Bro. Saysalot'),
    new Message(
      4,
      'Assignments',
      'Got it. I will listen when you make a statement.',
      'Iam Literal'),
    new Message(
      5,
      'Assignments',
      'What do you mean you won\'t listen to my questions? Iam, the teacher will ask questions. It\'s their job.',
      'Bro. Jackson')
];
  constructor() {}

  ngOnInit(): void {
  }

  onAddMessage(message: Message): void {
    this.messageList.push(message);
  }

}
