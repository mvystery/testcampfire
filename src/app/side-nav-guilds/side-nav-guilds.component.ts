import { Component, OnInit } from '@angular/core';
import { DashboardGuildManageComponent } from '../dashboard/manage/dashboard-guild-manage.component';

@Component({
  selector: 'app-side-nav-guilds',
  templateUrl: './side-nav-guilds.component.html',
  styleUrls: ['./side-nav-guilds.component.css']
})
export class SideNavGuildsComponent implements OnInit {
  viewing = 'prefix';

  constructor(private GuildMan: DashboardGuildManageComponent) { }

  ngOnInit() {
  }

  changeView(view) {
    this.viewing = view;
    this.GuildMan.changeTab(view);
  }

}
