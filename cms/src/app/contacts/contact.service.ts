import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

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
  selectedContactEvent = new EventEmitter<Contact>();
  deleteSelectedContactEvent = new EventEmitter<Contact[]>();

  /**
   * Constructor -
   * Stores the Contacts, from an external file, to a list for easy retrieval
   */
  constructor() {
    this.contactList = MOCKCONTACTS;
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

  deleteContact(contact: Contact): Contact[] {
    if (!contact) {
      return;
    }
    const pos = this.contactList.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contactList.splice(pos, 1);
    this.deleteSelectedContactEvent.emit(this.contactList.slice());
  }
}
