import {Injectable} from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  itemList: Document[] = [];
  updateListEvent$ = new Subject<Document[]>();
  selectedDocumentEvent$ = new Subject<Document>();
  // deleteSelectedDocumentEvent$ = new Subject<Document[]>();
  documentMaxId: number;

  constructor() {
    this.itemList = MOCKDOCUMENTS;
    this.documentMaxId = this.getMaxId(this.itemList);
  }

  /**
   * GetDocumentList -
   * Method to retrieve the stored list of Documents.
   */
  getDocumentList(): Document[] {
    return this.itemList;
  }

  /**
   * GetDocumentListById -
   * Method to retrieve the request document by the given Id, which then returns that document
   * @param id The requested document's Id
   */
  getDocumentListById(id: string): Document {
    // console.log(id);
    return this.itemList.find(document => (document.id === id ? document : null));
  }

  /**
   * getMaxId
   * Retrieves the max Id number from a given list.
   * Id must be a string, and included an item of the array
   * @param maxIdList any provided list
   * @return maxId The number of the highest id in the list.
   */
  getMaxId(maxIdList: any[]): number {
    let maxId = 0;

    const chkMax = (id: number) => {
      if (id > maxId) {
        maxId = id;
      }
    };

    maxIdList.forEach((item) => {
      chkMax(parseFloat(item.id));
    });

    return maxId;
  }
  /**
   * Add Item
   * General method to add a new  a new object to the current itemList.
   * Requires the getMaxId(itemList) method to be included in the class.
   * Requires a subject[] observable updateListEvent$ to be in the class
   * Requires itemList to be included in class
   * @param newItem The item to be added to the ItemList
   * @param itemList The current ItemList
   */
  addItem(newItem: any): any[] {
    if (!newItem) {
      return;
    }
    newItem.id = this.getMaxId(this.itemList);
    this.itemList.push(newItem);
    this.updateListEvent$.next(this.itemList.slice());
  }

  /**
   * UpdateItem
   * Uses a newItem to replace the originalItem including its Id number. Then, emits the updated list through an Observable
   * Requires a subject[] observable updateListEvent$ to be in the class
   * @param originalItem - original item to be altered
   * @param newItem - new item for replacing the original
   * @param itemList - current list that needs updating
   */
  updateItem(originalItem: any, newItem: any): void {
    if (!originalItem || !newItem) {
      return;
    }
    // current index of item if there
    const pos = this.itemList.indexOf(originalItem);
    if (pos < 0) {
      return;
    }
    newItem.id = originalItem.id;
    this.itemList[pos] = newItem;
    this.updateListEvent$.next(this.itemList.slice());
  }

  /**
   * DeleteItem
   * Finds the item in the list, and removes it from this list. Then, emits the changes in the list
   * Requires a subject[] observable updateListEvent$ to be in the class
   * Requires itemList to be included in class
   * @param deleteItem - item that needs to be removed from current list
   * @param itemList - current list that needs updating
   */
  deleteItem(deleteItem: any): void {
    // Is it a document
    if (!deleteItem) {
      return;
    }
    // Get index of current document, if there
    const pos = this.itemList.indexOf(deleteItem);
    if (pos < 0) {
      return;
    }
    // Delete selected item, emit the updated list
    this.itemList.splice(pos, 1);
    this.updateListEvent$.next(this.itemList.slice());
  }


  // /**
  //  * AddDocument
  //  * Adds a new Document to the current documents file.
  //  * @param newDocument - user's file to be added
  //  */
  // addDocument(newDocument: Document): void {
  //   if (!newDocument) {
  //     return;
  //   }
  //   newDocument.id = String(this.documentMaxId++);
  //   this.documentList.push(newDocument);
  //   this.documentListUpdateEvent$.next(this.documentList.slice());
  // }
  //
  // /**
  //  * UpdateDocument
  //  * Method to alter the original document with the new changes from the user.
  //  * @param originalDocument - current stored document
  //  * @param newDocument - updated document to be stored
  //  */
  // updateDocument(originalDocument: Document, newDocument: Document): void {
  //   if (!originalDocument || !newDocument) {
  //     return;
  //   }
  //   // current index of document if there
  //   const pos = this.documentList.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }
  //
  //   newDocument.id = originalDocument.id;
  //   this.documentList[pos] = newDocument;
  //   this.documentListUpdateEvent$.next(this.documentList.slice());
  // }
  // deleteDocument(document: Document): Document[] {
  //   // Is it a document
  //   if (!document) {
  //     return;
  //   }
  //   // Get index of current document, if there
  //   const pos = this.documentList.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   // Delete selected document, emit the updated list
  //   this.documentList.splice(pos, 1);
  //   // Next changes the subscribed current value
  //   this.documentListUpdateEvent$.next(this.documentList.slice());
  //
  // }
}
