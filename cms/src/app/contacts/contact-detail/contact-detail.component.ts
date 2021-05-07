import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Contact} from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

/**
 * ContactDetailComponent
 * Displays detailed information about the contact with options to delete, or clear the contact from view
 */
export class ContactDetailComponent implements OnInit {
  @Input() nextContactInfo: Contact;

  // @ViewChild('contactDetails', {static: true}) contactDetails: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  // onContactClear(): void {
  //   this.contactDetails.nativeElement.value = '';
  // }
}
