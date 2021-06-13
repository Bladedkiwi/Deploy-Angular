import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {

  originalDocument: Document;
  document: Document;
  editMode = false;
  private documentEditSub: Subscription;

  constructor(private documentService: DocumentService, private route: Router, private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.documentEditSub = this.actRoute.params.subscribe(
      (params: Params) => {
        // Checks if params are null/undefined before finding the original document
        this.editMode = !!((null ?? params.id) || (undefined ?? params.id));
        if (this.editMode) {
          this.originalDocument = this.documentService.getDocumentById(params.id);
        }
        this.editMode = !!((null ?? this.originalDocument) || (undefined ?? this.originalDocument));
        if (this.editMode) {
          this.document = Object.assign({}, this.originalDocument);
        }
        return;
      }
    );

  }

  ngOnDestroy(): void {
    this.documentEditSub.unsubscribe();
  }

  onCancel(): void {
    this.route.navigate(['/documents']);
  }

  onSubmit(form: NgForm): void {
    const newDocument = new Document('', form.value.name, form.value?.description, form.value?.url, []);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.route.navigate(['/documents']);


  }
}
