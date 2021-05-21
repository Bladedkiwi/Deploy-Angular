import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  nextContactInfo: Contact;


  // @ViewChild('contactDetails', {static: true}) contactDetails: ElementRef;

  constructor(private contactService: ContactService, private actRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    this.actRoute.params.subscribe(
      (params) => {
      if (params.id != null || undefined) {
        this.nextContactInfo = this.contactService.getContactById(params.id);
        // console.log(params.id);
      }
    }
  );

  }

  onDeleteContact(): void {
    this.contactService.deleteContact(this.nextContactInfo);
    this.router.navigate(['/contacts']);
  }

  // onContactClear(): void {
  //   this.contactDetails.nativeElement.value = '';
  // }
}
