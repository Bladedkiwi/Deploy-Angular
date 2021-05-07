import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact} from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

/**
 * ContactListComponent
 * Responsible for displaying the list of contacts that the end user has access to
 */
export class ContactListComponent implements OnInit {
  // User selected Contact's information
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  // List of current Contacts saved
  contactList: Contact[] = [
    new Contact(
      '1',
      'R. Kent',
      'Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null),
    new Contact(
      '2',
      'Rex',
      'Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '../../assets/images/barzeer.jpg',
      null
    )
  ];
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * OnSelected
   * When a user selects a contact, this method sends that contact's information to be shown in the details
   * @param contact selected contact object
   */
  onSelected(contact: Contact): void {
    this.selectedContactEvent.emit(contact);
  }

}
