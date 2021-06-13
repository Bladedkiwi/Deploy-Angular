import {Component, OnDestroy, OnInit} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

/**
 * DocumentListComponent
 * Responsible for displaying the list of documents that the end user has access to
 */
export class DocumentListComponent implements OnInit, OnDestroy {

  documentList: Document[] = [];
  nextDocumentId: number;
  private documentSub: Subscription;

  constructor(private documentService: DocumentService) {
    // this.documentList = this.documentService.getDocumentList();
  }

  ngOnInit(): void {
    this.documentList = this.documentService.getDocumentList();
    // this.documentService.deleteSelectedDocumentEvent.subscribe(documentList => this.documentList = documentList);
    this.documentSub = this.documentService.updateDocumentListEvent$.subscribe(documentList => this.documentList = documentList);
  }

  ngOnDestroy(): void {
    this.documentSub.unsubscribe();
  }

  // onSelected(document: Document): void {
  //   // Display selected document
  //   this.documentService.selectedDocumentEvent.emit(document);
  // }
}
