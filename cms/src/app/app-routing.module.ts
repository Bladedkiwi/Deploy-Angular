import {NgModule} from '@angular/core';
// Register the RouterModule to enable usage of routes
import {RouterModule, Routes} from '@angular/router';

import {ContactsComponent} from './contacts/contacts.component';
import {DocumentsComponent} from './documents/documents.component';
import {MessageListComponent} from './messages/message-list/message-list.component';
import {DocumentEditComponent} from './documents/document-edit/document-edit.component';
import {DocumentDetailComponent} from './documents/document-detail/document-detail.component';
import {ContactEditComponent} from './contacts/contact-edit/contact-edit.component';
import {ContactDetailComponent} from './contacts/contact-detail/contact-detail.component';

// The :id refers to a URL parameter named id. Or, the passed in parameter from the RouterLink directive

// The paths for the various pages/routes of travel
const appRoutes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {
    path: 'documents', component: DocumentsComponent, children: [
      {path: 'new', component: DocumentEditComponent},
      {path: ':id', component: DocumentDetailComponent},
      {path: ':id/edit', component: DocumentEditComponent}
    ]
  },
  {path: 'messages', component: MessageListComponent},
  {
    path: 'contacts', component: ContactsComponent, children: [
      {path: 'new', component: ContactEditComponent},
      {path: ':id', component: ContactDetailComponent},
      {path: ':id/edit', component: ContactEditComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

/**
 * Steps to Creating a Routing Module:
 * <br>
 * <ul>
 * <li>import angular module, and the routing module and routes</li>
 * <li>import the components needed for the various paths</li>
 * <li>create the path names for the various components</li>
 * <li>Initiate the angular module and include it's imports for the RouterModule and an export of said RouterModule</li>
 * <li>Export the actual class of the AppRoutingModule</li>
 * </ul>
 * <br>
 * Benefits of the appRoutingModule:
 * <br>
 * <ul>
 * <li>replaces the need to define the routing configuration in the app module</li>
 * <li>Easy to configure as the app grows</li>
 * <li>Keeps the code clean overall</li>
 * </ul>
 */
export class AppRoutingModule {
}
