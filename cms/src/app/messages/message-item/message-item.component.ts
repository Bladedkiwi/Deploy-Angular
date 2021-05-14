import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {ContactService} from '../../contacts/contact.service';
import {Contact} from '../../contacts/contact.model';


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
  messageSender: string;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContactById(this.nextMessage.sender);
    this.messageSender = contact.name;
  }

}
