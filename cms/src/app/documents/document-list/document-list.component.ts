import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Document } from '../document.model';
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
  @Output() onSelectedDocumentEvent = new EventEmitter<Document>();

  documentsList: Document[] = [
    new Document(
      '1',
      'Cliff Diving',
      'Jane loves to dive off of cliffs',
      'https://www.youtube.com/watch?v=toh_UHyvOos',
      ['Bob', 'Ramon', 'Jillian']),
      new Document(
        '2',
        'Artistic Swimming',
        'Synchronized swimming with style',
        'https://www.youtube.com/watch?v=dRGQDubSAqw',
        ['Bob', 'Ramon', 'Jillian']),
    new Document(
      '3',
      'Surfing',
      'People braving the waves',
      'https://www.youtube.com/watch?v=toh_UHyvOos',
      ['Bob', 'Ramon', 'Jillian']),
    new Document(
      '4',
      'Mountain Biking',
      'Jumping and bumping along a trail with a bike.',
      'https://www.youtube.com/watch?v=p2xBsiNca7c',
      ['Bob', 'Ramon', 'Jillian']),
    new Document(
      '1', 'Ba', '', '', []),
    new Document(null, null, null, null, null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(document: Document): void {
    // Display selected document
    this.onSelectedDocumentEvent.emit(document);
  }
}
