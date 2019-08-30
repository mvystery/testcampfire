import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-handler',
  templateUrl: './settings-handler.component.html',
  styleUrls: ['./settings-handler.component.css']
})
export class SettingsHandlerComponent implements OnInit {
  prefix = true;
  welcomer = false;

  general = true;
  roblox = false;
  verify = false;

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

  changeSection(sectionName) {
    if (sectionName === 'general') {
      this.general = true;
      this.roblox = false;

      this.welcomer = false;
      this.verify = false;
      this.prefix = true;
    }

    if (sectionName === 'roblox') {
      this.roblox = true;
      this.general = false;

      this.prefix = false;
      this.welcomer = false;
      this.verify = true;
    }
  }
}
