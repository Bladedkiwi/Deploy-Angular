import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.model';
import {ContactService} from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

/**
 * ContactsComponent
 * The parent component that is responsible for displaying both the contact list and any details for each contact.
 */
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    /*
    Observables are declarative—that is, you define a function for publishing values, but it is not executed until a
    consumer subscribes to it. The subscribed consumer then receives notifications until the function completes,
     or until they unsubscribe.
     https://angular.io/guide/observables
     */
    this.contactService.selectedContactEvent
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
        });
  }

}
