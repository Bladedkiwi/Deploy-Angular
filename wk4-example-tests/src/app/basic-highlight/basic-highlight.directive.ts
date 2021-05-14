import { Directive, ElementRef, OnInit } from '@angular/core';

// @Directive to create a custom directive to use
// selector is required - either by element p or attribute style [p]
@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  // Instances that are created need a reference to the element that it was created on
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
