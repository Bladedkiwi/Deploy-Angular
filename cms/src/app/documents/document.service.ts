import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentList: Document[] = [];
  selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {
    this.documentList = MOCKDOCUMENTS;
  }

  /**
   * GetDocumentList -
   * Method to retrieve the stored list of Documents.
   */
  getDocumentList(): Document[] {
    return this.documentList;
  }

  /**
   * GetDocumentListById -
   * Method to retrieve the request document by the given Id, which then returns that document
   * @param id The requested document's Id
   */
  getDocumentListById(id: string): Document {
    return this.documentList.find(document => (document.id === id ? document : null ));
  }
}
