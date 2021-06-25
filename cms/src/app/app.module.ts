import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactDetailComponent} from './contacts/contact-detail/contact-detail.component';
import {ContactListComponent} from './contacts/contact-list/contact-list.component';
import {ContactItemComponent} from './contacts/contact-item/contact-item.component';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentListComponent} from './documents/document-list/document-list.component';
import {DocumentItemComponent} from './documents/document-item/document-item.component';
import {DocumentDetailComponent} from './documents/document-detail/document-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageListComponent} from './messages/message-list/message-list.component';
import {MessageItemComponent} from './messages/message-item/message-item.component';
import {MessageEditComponent} from './messages/message-edit/message-edit.component';
import {DropdownMenuDirective} from './shared/dropdown.directive';
import {AppRoutingModule} from './app-routing.module';
import {DocumentEditComponent} from './documents/document-edit/document-edit.component';
import {ContactEditComponent} from './contacts/contact-edit/contact-edit.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import {DocumentService} from "./documents/document.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    DropdownMenuDirective,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        DndModule.forRoot(),
        ReactiveFormsModule
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
