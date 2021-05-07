import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})

/**
 * DocumentItemComponent
 * The child component of the Documents List which displays the title of the current Document
 *
 */
export class DocumentItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
