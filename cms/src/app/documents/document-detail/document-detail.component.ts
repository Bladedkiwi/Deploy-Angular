import {Component, OnInit} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {WindRefService} from "../../wind-ref.service";

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
  // @Input() nextDocumentInfo: Document;
  nextDocumentInfo: Document;
  nextDocumentId: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService, private windRef: WindRefService, private actRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    this.actRoute.params.subscribe(
      (params) => {
        this.nextDocumentId = params.id;
        // console.log(this.nextDocumentId);
        this.nextDocumentInfo = this.documentService.getDocumentListById(this.nextDocumentId);
      });

    this.nativeWindow = this.windRef.getNativeWindow();
  }

  onViewDocument(): void {
    this.nativeWindow.open(this.nextDocumentInfo.url);
  }

  onDeleteDocument(): void {
    this.documentService.deleteDocument(this.nextDocumentInfo);
    this.router.navigate(['/documents']);
  }

}
