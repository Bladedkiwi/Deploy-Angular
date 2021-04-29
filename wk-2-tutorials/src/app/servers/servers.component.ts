import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  // Property boolean that can by used later
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = 'TestServer';
  serverCreated = false;
  servers = ['TestServer', 'TestServer2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onServerCreation(): void {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server was created: ${this.serverName}`;
  }

  onUpdateServerName(e: any): void {
    // console.log(e);
    // Typescript likes things explicitly typescasted
    this.serverName = (e.target as HTMLInputElement).value;
  }

}
