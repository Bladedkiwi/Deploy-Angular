import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';

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

  constructor() { }

  ngOnInit(): void {
  }

}
