import {Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {DocumentService} from '../document.service';
import {ActivatedRoute, Params} from "@angular/router";
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

/**
 * DocumentListComponent
 * Responsible for displaying the list of documents that the end user has access to
 */
export class DocumentListComponent implements OnInit {

  documentList: Document[] = [];
  nextDocumentId: number;

  constructor(private documentService: DocumentService) {
    // this.documentList = this.documentService.getDocumentList();
  }

  ngOnInit(): void {
    this.documentList = this.documentService.getDocumentList();
    this.documentService.deleteSelectedDocumentEvent.subscribe(documentList => this.documentList = documentList);
  }

  // onSelected(document: Document): void {
  //   // Display selected document
  //   this.documentService.selectedDocumentEvent.emit(document);
  // }
}
