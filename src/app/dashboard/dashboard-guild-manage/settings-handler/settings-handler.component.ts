import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-handler',
  templateUrl: './settings-handler.component.html',
  styleUrls: ['./settings-handler.component.css']
})
export class SettingsHandlerComponent implements OnInit {
  prefix = true;
  welcomer = false;

  constructor() {}

  ngOnInit() {}

  changeTab(tabName) {
    if (tabName === 'welcomer') {
      this.prefix = false;
      this.welcomer = true;
    }

    if (tabName === 'prefix') {
      this.welcomer = false;
      this.prefix = true;
    }
  }
}
