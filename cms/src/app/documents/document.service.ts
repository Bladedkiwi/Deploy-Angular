import {EventEmitter, Injectable} from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentList: Document[] = [];
  selectedDocumentEvent = new EventEmitter<Document>();
  deleteSelectedDocumentEvent = new EventEmitter<Document[]>();

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
    // console.log(id);
    return this.documentList.find(document => (document.id === id ? document : null));
  }

  deleteDocument(document: Document): Document[] {
    // Is it a document
    if (!document) {
      return;
    }
    // Get index of current document, if there
    const pos = this.documentList.indexOf(document);
    if (pos < 0) {
      return;
    }
    // Delete selected document, emit the updated list
    this.documentList.splice(pos, 1);
    this.deleteSelectedDocumentEvent.emit(this.documentList.slice());

  }
}
