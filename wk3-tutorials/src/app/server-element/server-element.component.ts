import {Component, OnInit, Input, ViewEncapsulation, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

/**
 *  Implementing the hook interfaces is a good practice to have
 */
export class ServerElementComponent implements OnInit {
  // Creation of an element object to allow only these types for that element
  // @Input allows the parent component access to this value
  //    Similar to export and similar to a parent class child class structure
  //    Able to pass a name through @Input forcing the parent to call it that first known as Alias
  @Input('srvElement')element: {
    type: string,
    name: string,
    content: string
  };
  constructor() {}

  /**
   * ngOnInit
   *
   * Angular's component lifecycle hooks
   * ngOnChanges - Called after a bound input property changes
   * ngOnInit - Called once the component is initialized
   * ngDoCheck - Called during every change detection run
   * ngAfterContentInit - Called after content (ng-content) has been projected into view
   * ngAfterContentChecked - Called every time the projected content has been checked
   * ngAfterViewInit - Called after the component's view ( and child views) has been intialized
   * ngAfterViewChecked - Called every time the view (and child views) have been checked
   * ngOnDestroy - Called once the component is about to be destroyed
   */
  ngOnInit(): void {
  }

}
