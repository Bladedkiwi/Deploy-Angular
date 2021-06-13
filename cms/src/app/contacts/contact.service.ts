import {Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';

// @Injectable marks the class as on that takes part in dependency injection system
/*
 Dependency Injection system:
    -Dependencies are services or object that a class needs to perform its function.
    -Dependency Injection is a design pattern - a class requests these dependencies from external sources
    rather than creating them.
    -This framework(Angular) provides dependencies to a class upon instantiation.
       Instantiation means:
          the process of deriving an individual statement from a general one by replacing the variable with a name
          or other referring expression
     -Dependencies increase flexibility and modularity in your applications
        Modularity means:
           the use of individually distinct functional units
   https://angular.io/guide/dependency-injection
 */

@Injectable({
  // ProvidedIn is the provider that can create or deliver a service.
  // It instantiates or creates a general statement in which referring variables/expressions can access
  providedIn: 'root'
  // Angular won't inject this in the application if it isn't used.
})


/*
  -Services are a great way to share information among classes that don't know each other.
  -Services allow retrieval of data from anywhere like web services, local storage, mock data services.
  -What's useful about these:
     Easily able to remove data access from components without altering the component itself.

   https://angular.io/tutorial/toh-pt4

 */

/**
 * ContactService -
 * Retrieves the files which contain the various Contacts and stores them to a list.
 */
export class ContactService {

  contactList: Contact[] = [];
  selectedContactEvent$ = new Subject<Contact>();
  // contactListUpdateEvent$ = new Subject<Contact[]>();
  updateContactListEvent$ = new Subject<any[]>();
  private contactMaxId: number;
  private check = true;

  /**
   * Constructor -
   * Stores the Contacts, from an external file, to a list for easy retrieval
   */
  constructor() {
    this.contactList = MOCKCONTACTS;
    // this.contactMaxId = this.getContactMaxId(this.contactList);
  }

  /**
   * GetContactList -
   * Method that retrieves a list of all known contacts
   */
  getContactList(): Contact[] {
    return this.contactList;
  }

  /**
   * GetContactById -
   * Method that returns the specified Contact matching its ID if found.
   * @param id The requested Contact by Id
   */
  getContactById(id: string): Contact {
    return this.contactList.find(contact => (contact.id === id ? contact : null));
  }

  /**
   * getMaxId
   * Retrieves the max Id number from a given list.
   * Id must be a string, and included an item of the array
   * @return maxId The number of the highest id in the list.
   */
  getContactMaxId(): number {
    let maxId = 0;

    const chkMax = (id: number) => {
      if (id > maxId) {
        maxId = id;
      }
    };

    this.contactList.forEach((item) => {
      chkMax(parseFloat(item.id));
    });

    return maxId;
  }

  addContact(newContact: Contact): void {

    // Checks if newContact is null/undefined before assigning a new Id
    if (!((null ?? newContact.id) || (undefined ?? newContact.id))) {
      newContact.id = String((this.getContactMaxId() + 1));
      this.contactList.push(newContact);
      this.updateContactListEvent$.next(this.contactList.slice());
    } else {
      return;
    }
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    let pos = 0;

    // Checks null/undefined for original/new cotnact
    this.check = (!!((null ?? originalContact.id) || (undefined ?? originalContact.id) ||
      ((null ?? newContact.id) || (undefined ?? newContact.id))));

    if (this.check) {
      // sets the position of the original contact
      pos = this.contactList.indexOf(originalContact);
      if (this.check && !(pos < 0)) {
        // Update list with new contact if position is a real number and check is true
        newContact.id = originalContact.id;
        this.contactList[pos] = newContact;
        this.updateContactListEvent$.next(this.contactList.slice());
      }
    }
    else {return; }
  }

  deleteContact(contact: Contact): Contact[] {
    let pos = 0;
    this.check = (!!((null ?? contact) || (undefined ?? contact)));

    if (this.check) {
      // sets the position of the original contact
      pos = this.contactList.indexOf(contact);
      // Update list with new contact if position is a real number and check is true
      if (this.check && !(pos < 0)) {
        // Delete selected contact, emit the updated list
        this.contactList.splice(pos, 1);
        // Next changes the subscribed current value
        this.updateContactListEvent$.next(this.contactList.slice());
      }
    }
    else {
      return;
    }
  }


  // /**
  //  * Add Item
  //  * General method to add a new  a new object to the current itemList.
  //  * Requires the getMaxId(itemList) method to be included in the class.
  //  * Requires a subject[] observable updateListEvent$ to be in the class
  //  * Requires itemList to be included in class
  //  * @param newItem The item to be added to the ItemList
  //  * @param itemList The current ItemList
  //  */
  // addItem(newItem: any): any[] {
  //   if (!newItem) {
  //     return;
  //   }
  //   newItem.id = this.getMaxId(this.itemList);
  //   this.itemList.push(newItem);
  //   this.updateListEvent$.next(this.itemList.slice());
  // }
  //
  // /**
  //  * UpdateItem
  //  * Uses a newItem to replace the originalItem including its Id number. Then, emits the updated list through an Observable
  //  * Requires a subject[] observable updateListEvent$ to be in the class
  //  * @param originalItem - original item to be altered
  //  * @param newItem - new item for replacing the original
  //  * @param itemList - current list that needs updating
  //  */
  // updateItem(originalItem: any, newItem: any): void {
  //   if (!originalItem || !newItem) {
  //     return;
  //   }
  //   // current index of item if there
  //   const pos = this.itemList.indexOf(originalItem);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newItem.id = originalItem.id;
  //   this.itemList[pos] = newItem;
  //   this.updateListEvent$.next(this.itemList.slice());
  // }
  //
  // /**
  //  * DeleteItem
  //  * Finds the item in the list, and removes it from this list. Then, emits the changes in the list
  //  * Requires a subject[] observable updateListEvent$ to be in the class
  //  * Requires itemList to be included in class
  //  * @param deleteItem - item that needs to be removed from current list
  //  * @param itemList - current list that needs updating
  //  */
  // deleteItem(deleteItem: any): void {
  //   // Is it a document
  //   if (!deleteItem) {
  //     return;
  //   }
  //   // Get index of current document, if there
  //   const pos = this.itemList.indexOf(deleteItem);
  //   if (pos < 0) {
  //     return;
  //   }
  //   // Delete selected item, emit the updated list
  //   this.itemList.splice(pos, 1);
  //   this.updateListEvent$.next(this.itemList.slice());
  // }
}
