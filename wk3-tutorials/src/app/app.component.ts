import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Property and Event Binding
 * HTML Elements - Native Properties and Events (onClick)
 * Directives - Custom Properties and Events (ngStyle, ngClass)
 * Components - Custom Properties and Events
 */
export class AppComponent {
  // Each Server element will have these specified values in each element object
  serverElements = [
    {
      type: 'server',
      name: 'TestServer',
      content: 'Testing Time!'
    }
  ];

  /**
   * onServerAdded
   * Accepts an object containing server information, and adds it to the list of current servers
   * @param $e server details
   */
  onServerAdded($e): void {
    this.serverElements.push({
      type: 'server',
      name: $e.serverData.serverName,
      content: $e.serverData.serverContent
    });
  }

  /**
   * onBlueprintAdded
   * Accepts an object containing the new blueprint information for a server that will be added to the current server list
   * @param $e blueprint server details
   */
  onBlueprintAdded($e): void {
    this.serverElements.push({
      type: 'blueprint',
      name: $e.serverData.serverName,
      content: $e.serverData.serverContent
    });
  }


}
