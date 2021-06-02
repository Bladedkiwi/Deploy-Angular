import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from './contact.model';
import {ContactService} from './contact.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

/**
 * ContactsComponent
 * The parent component that is responsible for displaying both the contact list and any details for each contact.
 */
export class ContactsComponent implements OnInit, OnDestroy {
  selectedContact: Contact;
  private contactSub: Subscription;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    /*
    Observables are declarative—that is, you define a function for publishing values, but it is not executed until a
    consumer subscribes to it. The subscribed consumer then receives notifications until the function completes,
     or until they unsubscribe.
     https://angular.io/guide/observables
     */
    this.contactSub = this.contactService.selectedContactEvent$
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
        });
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
  }

}
