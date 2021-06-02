import {Component, OnDestroy, OnInit} from '@angular/core';
import {Document} from './document.model';
import {DocumentService} from './document.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

/**
 * DocumentsComponent
 * The parent component that is responsible for displaying both the document list and any details for each document.
 */
export class DocumentsComponent implements OnInit, OnDestroy {
  selectedDocument: Document;
  private selectedDocumentSub: Subscription;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.selectedDocumentSub = this.documentService.selectedDocumentEvent$
      .subscribe((document: Document) => {
        this.selectedDocument = document;
      });
  }

  ngOnDestroy(): void {
    this.selectedDocumentSub.unsubscribe();
  }

}
