import {Component, OnInit, EventEmitter, Output, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  // @Output is the opposite of @Input and for sending data to the parent component
  // EventEmitter allows for a custom event creation via <> containing the type
  @Output() serverCreated = new EventEmitter<{serverData: {serverName: string, serverContent: string}}>();
  @Output() blueprintCreated = new EventEmitter<{serverData: {serverName: string, serverContent: string}}>();

  // @ViewChild accesses the values from the input through local references that are fetched from a member field, and a method.
  // Don't try and change the value when using @ViewChild
  // Not the best way of grabbing from the DOM
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
  // @ContentChild can be used similarly to viewChild, but not until the "content of the page" has been rendered at
  // ngAfterContentInit() hook

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddServer(nameInput: string): void {
    // Pass the user's server creation values in the custom emitted event
    this.serverCreated.emit({
      serverData: {
        serverName: nameInput,
        serverContent: this.serverContentInput.nativeElement.value
      }});
  }

  onAddBlueprint(nameInput: string): void {
    this.blueprintCreated.emit({serverData: {
      serverName: nameInput,
        serverContent: this.serverContentInput.nativeElement.value
      }});
  }
}
