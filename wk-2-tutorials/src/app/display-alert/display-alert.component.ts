import { Component } from '@angular/core';

@Component ({
  selector: 'app-display-alert',
  templateUrl: 'display-alert.component.html',
  styles: [`
  .beWhite {
    color: white;
  }`]
})

export class DisplayAlertComponent {
  showDetails = false;
  clickCount: number[] = [];
  maxClicks = false;


  onShowDetails(): void {
    this.showDetails = true;
    this.clickCount.push(this.clickCount.length + 1);
    this.maxClicks = (this.clickCount.length >= 5);
  }
}

