import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../message.model';


@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})

/**
 * MessageItemComponent
 * Displays the information for a single message in the message list
 */
export class MessageItemComponent implements OnInit {
  @Input() nextMessage: Message;
  constructor() { }

  ngOnInit(): void {
  }

}
