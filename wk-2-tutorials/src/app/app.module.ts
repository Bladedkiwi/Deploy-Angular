import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {WarningAlertComponent} from './warning-alert/warning-alert.component';
// No file extension needed for import
import {SuccessAlertComponent} from './success-alert/success-alert.component';
import {ServerComponent} from './server/server.component';
import {ServersComponent} from './servers/servers.component';
import {UserComponent} from './user/user.component';
import {DisplayAlertComponent} from './display-alert/display-alert.component';



// NgModule is the Angular Module. So, the @NgModule is calling the Angular module that contains various packages used for loading an app.
@NgModule({
  // Declarations contain the defined components used for the angular application
  declarations: [
    AppComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    ServerComponent,
    ServersComponent,
    UserComponent,
    DisplayAlertComponent
  ],
  // Imports are the modules that are imported outside the app module.
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
