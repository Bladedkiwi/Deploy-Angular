import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  /**
   * Transform returns an array of only those Contact objects who's name contains the term(search value) entered by the end user.
   * @param contactList (Array of Contacts) parameter contains the data input to the pipe that is to be transferred into a different format
   * @param term (desired search value) Args parameter contains an array of one or more values that are needed to transform the data
   */
  transform(contactList: Contact[], term: string): unknown {
    const contactListCopy = contactList.filter((contact) => {
      // 'gi' simply orders the matches in alphabetical order
      const regex = new RegExp(term, 'gi');
      return contact.name.match(regex);
    });
    return contactListCopy ? contactListCopy : contactList;
  }

}
