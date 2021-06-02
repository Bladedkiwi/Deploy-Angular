import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

/**
 * ContactItemComponent
 * The child component of the Contacts List which displays the Name and image of the current contact
 *
 */
export class ContactItemComponent implements OnInit {
  // Creating retrieval access for a single contact
  @Input() nextContact: Contact;

  constructor() {
  }

  ngOnInit(): void {
  }

}
