import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardGuildManageComponent } from '../../dashboard-guild-manage.component';

@Component({
  selector: 'app-set-group',
  templateUrl: './set-group.component.html',
  styleUrls: ['./set-group.component.css']
})
export class SetGroupComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private guildMan: DashboardGuildManageComponent
  ) {}

  groupId: number;
  loaded = false;

  ngOnInit() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/verify`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        this.loaded = true;
        if (data.groupId !== undefined) {
          this.groupId = data.groupId;
        }
      });
  }

  setGroup() {
    const chosenGroup = (document.getElementById('group') as HTMLInputElement)
      .value;

    document.getElementById('setButton').innerHTML = 'Wait...';

    this.http
      .post<any>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/group`,
        {
          groupId: chosenGroup
        },
        {
          headers: {
            Authorization: localStorage.getItem('auth'),
            'Content-Type': 'application/json'
          }
        }
      )
      .subscribe(data => {
        if (data.success === true) {
          document.getElementById('setButton').innerHTML = 'Done';
          document.getElementById('setButton').classList.add('is-success');
          document.getElementById('setButton').classList.remove('is-primary');

          setTimeout(() => {
            document.getElementById('setButton').innerHTML = 'Set';
            document.getElementById('setButton').classList.remove('is-success');
            document.getElementById('setButton').classList.add('is-primary');
          }, 2000);
        }
      });
  }
}
