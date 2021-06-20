import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
  /*
  If including providers here in the @Component, this limits the provider scope by keeping the
  service all to this component.
  So, this component and its descendants can have access to the service, but other components in the same module can't
  https://angular.io/guide/providers
   */
  // providers: [ContactService]
})

/**
 * ContactListComponent
 * Responsible for displaying the list of contacts that the end user has access to
 */
export class ContactListComponent implements OnInit {
  // User selected Contact's information
  // @Output() onSelectedContactEvent = new EventEmitter<Contact>();

  // List holder for current Contacts
  contactList: Contact[] = [];
  term: string;


  /**
   * Constructor
   * Injects the current list of contacts from an external location
   * @param contactService The service that fetches the Contact List
   */
  constructor(private contactService: ContactService) {
  }

  /**
   * ngOnInit
   * Initializes the retrieval of the ContactList and saves it to its respective variable.
   */
  ngOnInit(): void {
    this.contactList = this.contactService.getContactList();
  }

  /**
   * OnSelected
   * When a user selects a contact, this method sends that contact's information to be shown in the details
   * @param contact selected contact object
   */
  onSelected(contact: Contact): void {
    this.contactService.selectedContactEvent$.next(contact);
  }

  search(value: string): void {
    this.term = value;
  }

}
