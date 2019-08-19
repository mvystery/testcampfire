import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardGuildManageComponent } from '../../dashboard-guild-manage.component';

interface WelcomeData {
  enabled: boolean;
  channel: string;
  message: string;
}

interface Callback {
  completed: boolean;
}

@Component({
  selector: 'app-set-welcomer',
  templateUrl: './set-welcomer.component.html',
  styleUrls: ['./set-welcomer.component.css']
})
export class SetWelcomerComponent implements OnInit {
  status = 'Disabled';
  enabled = false;
  loaded = false;
  message: string;
  channel: string;

  constructor(
    private http: HttpClient,
    private guildMan: DashboardGuildManageComponent
  ) {}

  ngOnInit() {
    this.http
      .get<WelcomeData>(
        `http://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/welcomer`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        this.loaded = true;
        console.log(data);
        if (data.enabled) {
          this.enabled = true;
          this.status = 'Enabled';
          this.message = data.message;
          this.channel = data.channel;
        } else {
          this.enabled = false;
          this.status = 'Disabled';
        }
      });
  }

  toggleWelcomer() {
    if (this.enabled === false) {
      this.http
        .post<Callback>(
          `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/welcomer/toggle`,
          {
            toggle: true
          },
          {
            headers: {
              Authorization: localStorage.getItem('auth')
            }
          }
        )
        .subscribe(data => {
          if (data.completed === true) {
            this.enabled = true;
            this.status = 'Enabled';
          }
        });
    } else {
      this.http
        .post<Callback>(
          `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/welcomer/toggle`,
          {
            toggle: false
          },
          {
            headers: {
              Authorization: localStorage.getItem('auth')
            }
          }
        )
        .subscribe(data => {
          if (data.completed === true) {
            this.enabled = false;
            this.status = 'Disabled';
          }
        });
    }
  }

  saveData() {
    const welcomeMessage = (document.getElementById(
      'welcomeMessage'
    ) as HTMLInputElement).value;

    const welcomeChannel = (document.getElementById(
      'welcomeChannel'
    ) as HTMLInputElement).value;

    this.http
      .post<Callback>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/welcomer`,
        {
          channel: welcomeChannel,
          message: welcomeMessage
        },
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        if (data.completed) {
          document.getElementById('saveButton').classList.add('is-success');
          document.getElementById('saveButton').innerHTML = 'Done!';
          setTimeout(() => {
            document.getElementById('saveButton').innerHTML =
              '<i class="fas fa-save"></i> Save';
            document
              .getElementById('saveButton')
              .classList.remove('is-success');
          }, 2000);
        }
      });
  }
}
