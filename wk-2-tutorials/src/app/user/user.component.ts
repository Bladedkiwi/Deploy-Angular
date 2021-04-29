import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName = '';
  resetName = true;

  constructor() {

  }

  ngOnInit(): void {
  }

  // Invalidate reset button if no userName string exists
  allowReset(): any {
    return this.resetName ? (!this.userName) : (this.userName);
  }

  resetUserField(e: Event): void {
    console.log(e);
    this.userName = '';
  }


}
