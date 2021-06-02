import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[cmsDropdownMenu]'
})

export class DropdownMenuDirective {
  @HostBinding('class.open') isOpen = false;

  constructor() {
  }

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
