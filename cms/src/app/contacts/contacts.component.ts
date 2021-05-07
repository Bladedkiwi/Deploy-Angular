import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.model';

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

  constructor() { }

  ngOnInit(): void {
  }

}
