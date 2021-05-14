import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import {DocumentService} from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

/**
 * DocumentsComponent
 * The parent component that is responsible for displaying both the document list and any details for each document.
 */
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.selectedDocumentEvent
      .subscribe((document: Document) =>
      {
        this.selectedDocument = document;
    });
  }

}
