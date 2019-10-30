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
  binds = false;
  assets = false;
  presence = false;
  group = false;

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

    if (tabName === 'verify') {
      this.binds = false;
      this.assets = false;
      this.verify = true;
      this.presence = false;
      this.group = false;
    }

    if (tabName === 'binds') {
      this.binds = true;
      this.verify = false;
      this.assets = false;
      this.presence = false;
      this.group = false;
    }

    if (tabName === 'assets') {
      this.assets = true;
      this.verify = false;
      this.binds = false;
      this.presence = false;
      this.group = false;
    }

    if (tabName === 'presence') {
      this.presence = true;
      this.assets = false;
      this.verify = false;
      this.binds = false;
      this.group = false;
    }

    if (tabName === 'group') {
      this.group = true;
      this.presence = false;
      this.assets = false;
      this.verify = false;
      this.binds = false;
    }
  }

  changeSection(sectionName) {
    if (sectionName === 'general') {
      this.general = true;
      this.roblox = false;

      this.welcomer = false;
      this.verify = false;
      this.prefix = true;
      this.binds = false;
      this.presence = false;
      this.assets = false;
      this.group = false;
    }

    if (sectionName === 'roblox') {
      this.roblox = true;
      this.general = false;

      this.prefix = false;
      this.welcomer = false;
      this.verify = true;
      this.binds = false;
      this.presence = false;
      this.assets = false;
      this.group = false;
    }
  }
}
