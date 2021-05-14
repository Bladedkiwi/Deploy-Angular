import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

/**
 * DocumentDetailComponent
 * Displays detailed information about the document with options to view, edit, or delete the document
 */
export class DocumentDetailComponent implements OnInit {
  @Input() nextDocumentInfo: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
