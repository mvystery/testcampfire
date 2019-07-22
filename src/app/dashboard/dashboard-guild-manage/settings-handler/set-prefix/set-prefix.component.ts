import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardGuildManageComponent } from '../../dashboard-guild-manage.component';

interface PrefixData {
  prefix: string;
}

interface PrefixSetData {
  prefix: string;
  status: string;
}

@Component({
  selector: 'app-set-prefix',
  templateUrl: './set-prefix.component.html',
  styleUrls: ['./set-prefix.component.css']
})
export class SetPrefixComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private guildMan: DashboardGuildManageComponent
  ) {}

  loaded = false;
  prefix: string;

  ngOnInit() {
    this.http
      .get<PrefixData>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/prefix`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        this.prefix = data.prefix;
        this.loaded = true;
      });
  }

  setPrefix() {
    const chosenPrefix = (document.getElementById('prefix') as HTMLInputElement)
      .value;
    console.log(chosenPrefix);

    document.getElementById('setButton').innerHTML = 'Wait...';

    this.http
      .post<PrefixSetData>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/prefix`,
        {
          prefix: chosenPrefix
        },
        {
          headers: {
            Authorization: localStorage.getItem('auth'),
            'Content-Type': 'application/json'
          }
        }
      )
      .subscribe(data => {
        if (data.status === 'success') {
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
