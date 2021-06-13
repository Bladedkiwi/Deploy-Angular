import {Component, OnDestroy, OnInit,} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, NgForm} from '@angular/forms';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  originalContact: Contact;
  contact: Contact;
  contactGroupList: Contact[] = [];
  editMode = false;
  contactEditSub: Subscription;
  invalidContactMessage: boolean;

  constructor(
    private contactService: ContactService,
    private route: Router,
    private actRoute: ActivatedRoute) {

    // this.contactGroupContainer = this.formBuilder.group({
    // contactGroup: this.formBuilder.array(this.contactGroupList)
    // });
  }

  ngOnInit(): void {
    this.contactEditSub = this.actRoute.params.subscribe(
      (params: Params) => {
        // Checks if params are null/undefined before finding the original document
        this.editMode = !!((null ?? params.id) || (undefined ?? params.id));
        if (this.editMode) {
          this.originalContact = this.contactService.getContactById(params.id);
        }
        this.editMode = !!((null ?? this.originalContact) || (undefined ?? this.originalContact));
        if (this.editMode) {
          this.contact = Object.assign({}, this.originalContact);
        }
        return;
      // // Checks if params are null/undefined before finding the original document
      // !((null ?? params.id) || (undefined ?? params.id)) ?
      //   this.editMode = false :
      //   this.originalContact = this.contactService.getContactById(params.id);
      //
      // // Checks if original document is null/undefined before finding changing original document
      // !((null ?? this.originalContact) || (undefined ?? this.originalContact)) ?
      //     this.editMode = false :
      //     this.contact = Object.assign({}, this.originalContact);
      //
      //   // Alternative Way
      //   // this.document = JSON.parse(JSON.stringify(this.originalDocument));
      //
      // if (!this.editMode) {return; }
      //   else {
      //     this.editMode = true;
      // }
    }
    );
  }

  ngOnDestroy(): void {
    this.contactEditSub.unsubscribe();
  }
  onCancel(): void {
    this.route.navigate(['/contacts']);
  }

  onSubmit(form: NgForm): void {
    // if (!((null ?? this.contact.group) || (undefined ?? this.contact.group))) {
    //   for (const person of this.contact.group) {
    //     this.contactGroupContainer.push(person);
    //   }

    const newContact = new Contact('', form.value.name, form.value?.email, form.value?.phone, form.value?.imageUrl, this.contactGroupList);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.route.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact): boolean {
    // Invalid if contact doesn't exist in the list, and not current contact instance
    if (!newContact || (this.contact && (newContact.id === this.contact.id))) {return true; }
    console.log(!!this.contactGroupList.find((contact) => newContact.id === contact.id));
    return !!this.contactGroupList.find((contact) => newContact.id === contact.id);
  }

  /**
   * addToGroup
   * Fires when contact is dragged into a group. With this event, it checks if it's in the group and adds it if it isn't
   * @param $event dragData event passed
   */
  addToGroup($event: any): void {
    const selectedContact: Contact = $event.dragData;
    this.invalidContactMessage = this.isInvalidContact(selectedContact);
    if (this.invalidContactMessage) {return;  }
    this.contactGroupList.push(selectedContact);
  }

  addGroupToContact(group: Contact[]): void {
    if (!(group ?? null) || (group ?? undefined)) {
      group = [];
    }
    this.contact.group = group;
  }

  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.contactGroupList.length) {return; }
    this.contactGroupList.splice(index, 1);
  }

}
