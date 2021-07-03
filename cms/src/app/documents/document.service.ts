import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Document } from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Subject} from 'rxjs';

// interface Response {
//   message: string;
//   documentList: Document[];
// }



@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentList: Document[] = [];
  updateDocumentListEvent$ = new Subject<Document[]>();
  selectedDocumentEvent$ = new Subject<Document>();
  documentListMaxId: number;
  private check = true;
  private docEndpoint = 'http://localhost:3000/documents';
  private jsonHeader = new HttpHeaders({'Content-Type': 'application/json'});
  // deleteSelectedDocumentEvent$ = new Subject<Document[]>();
  // documentMaxId: number;


  constructor(private httpClient: HttpClient) {
    // this.documentList = MOCKDOCUMENTS;
      httpClient.get<Document[]>(this.docEndpoint).subscribe(
      (documentListDB ) => {
        this.documentList = documentListDB;
        console.log(this.documentList);
        this.documentListMaxId = this.getDocumentMaxId();
        this.sortDocumentList();
        // this.documentList.sort((a, b) => {
        //   if (a.id < b.id) {
        //     return -1;
        //   }
        //   else if ( a.id > b.id) {
        //     return 1;
        //     }
        //   else {
        //     return 0;
        //     }
        //   });
        // this.updateDocumentListEvent$.next(this.documentList.slice());
      },
    error => {
        console.log(error.message);
    });
  }

  // storeDocumentList(): void {
  //   const docArray = JSON.stringify(this.documentList);
  //   this.httpClient.put(this.docEndpoint, docArray, {headers: this.jsonHeader}).subscribe(
  //       (response: Document[]) => {
  //
  //         this.updateDocumentListEvent$.next(response);
  //
  //       }, error => {
  //         console.log(error.message);
  //       }
  //     );
  // }
  /**
   * GetDocumentList -
   * Method to retrieve the stored list of Documents.
   */
  getDocumentList(): Document[] {
    return this.documentList;
  }

  /**
   * SortDocumentList
   * Orders the list of documents by their id
   *
   */
  sortDocumentList(): void {
    this.documentList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      else if ( a.id > b.id) {
        return 1;
      }
      else {
        return 0;
      }
    });
    this.updateDocumentListEvent$.next(this.documentList.slice());

  }
  /**
   * GetDocumentById -
   * Method to retrieve the request document by the given Id, which then returns that document
   * @param id The requested document's Id
   */
  getDocumentById(id: string): Document {
    // console.log(id);
    return this.documentList.find(document => (document.id === id ? document : null));
  }

  /**
   * getMaxId
   * Retrieves the max Id number from a given list.
   * Id must be a string, and included an item of the array
   * @return maxId The number of the highest id in the list.
   */
  getDocumentMaxId(): number {
    let maxId = 0;

    // Method to find the max number
    const chkMax = (id: number) => {
      if (id > maxId) {
        maxId = id;
      }
    };
    this.documentList.forEach((item) => {
      chkMax(parseFloat(item.id));
    });
    return maxId;
  }



  /**
   * AddDocument
   * Adds a new Document to the current documents file.
   * @param newDocument - user's file to be added
   */
  addDocument(newDocument: Document): void {

    // Checks if newDocument is null/undefined before assigning a new Id
    if (!((null ?? newDocument.id) || (undefined ?? newDocument.id))) {
      newDocument.id = String((this.getDocumentMaxId() + 1));
      console.log(newDocument);

      // Add Document to the server
      this.httpClient.post<Document>(this.docEndpoint, newDocument, {headers: this.jsonHeader}).subscribe(
        (document) => {
          console.log(document);
          this.documentList.push(document);
          this.sortDocumentList();
          // this.updateDocumentListEvent$.next(this.documentList.slice());
        }
      );

      // this.storeDocumentList();
    }
    else {return; }
  }

  /**
   * UpdateDocument
   * Method to alter the original document with the new changes from the user.
   * @param originalDocument - current stored document
   * @param newDocument - updated document to be stored
   */
  updateDocument(originalDocument: Document, newDocument: Document): void {
    let pos = 0;

    // Boolean variable for checking null/undefined of original/new document
    this.check = (!!((null ?? originalDocument.id) || (undefined ?? originalDocument.id) ||
      ((null ?? newDocument.id) || (undefined ?? newDocument.id))));

    if (this.check) {
      // sets the position of the original document
      pos = this.documentList.indexOf(originalDocument);
      if (this.check && !(pos < 0)) {

        // Update list with new document if position is a real number and check is true
        newDocument.id = originalDocument.id;

        this.httpClient.put(this.docEndpoint + '/' + newDocument.id, newDocument, {headers: this.jsonHeader}).subscribe(
          (res) =>  {
            this.documentList[pos] = newDocument;
            this.sortDocumentList();
        });

        // this.updateDocumentListEvent$.next(this.documentList.slice());
        // this.storeDocumentList();
      }
    }
    else {return; }
  }

  deleteDocument(document: Document): Document[] {
    let pos = 0;
    // Boolean to check null/undefined
    this.check = (!!((null ?? document) || (undefined ?? document)));

    if (this.check) {
      // sets the position of the original document
      pos = this.documentList.indexOf(document);
      // Update list with new document if position is a real number and check is true
      if (this.check && !(pos < 0)) {
        // Delete selected document from database
        this.httpClient.delete((this.docEndpoint + '/' + document.id)).subscribe(
          (res) => {
            this.documentList.splice(pos, 1);
            this.sortDocumentList();
          });

        // this.documentList.splice(pos, 1);
        // Next changes the subscribed current value
        // this.updateDocumentListEvent$.next(this.documentList.slice());
        // this.storeDocumentList();
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
