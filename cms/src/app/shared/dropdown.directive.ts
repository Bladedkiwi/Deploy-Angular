import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropdownMenu]'
})

export class DropdownMenuDirective {
  constructor() {}


  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseenter') autoOpen(): void {
    this.isOpen = true;
  }

  @HostListener('mouseleave') autoClose(): void {
    this.isOpen = false;
  }

}
