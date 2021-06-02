import {Component, Input, OnInit} from '@angular/core';
import {Document} from '../document.model';

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
  @Input() nextDocument: Document;
  @Input() nextDocumentId: string;

  // id: number;
  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.nextDocumentId);
    // Snapshot is only useful for instances where the items will never be re-used. It also doesn't need the use of observable operators
    // const id = this.route.snapshot.params.id;
    // console.log(id);
    // console.log(this.nextDocument);

    // Instead subscribing to the params observable provides a way to re-use data and provide data asnyc.
    // The params observable is an observable of the matrix parameters scoped to this route.
    // Matrix parameters is an alternative URL where they can apply a particular path element like the Document we are passing.
    // While query parameters apply the request as a whole

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.nextDocumentId = params.id;
    //     console.log('Defined Id:' + this.nextDocumentId);
    //     this.nextDocument = this.documentService.getDocumentListById(this.nextDocumentId);
    //   });

    // this.route.params.subscribe(
    //   (params  ) => {
    //     this.nextDocumentId = +params.id;
    //     console.log(this.nextDocumentId);
    //   }

    // const routeParams = this.route.snapshot.paramMap;
    // const documentIdFromRoute = Number(routeParams.get('id'));
    // console.log(documentIdFromRoute);

  }

}
