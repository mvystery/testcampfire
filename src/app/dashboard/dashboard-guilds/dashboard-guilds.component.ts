import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface GuildData {
  valid: boolean;
}

@Component({
  selector: 'app-dashboard-guilds',
  templateUrl: './dashboard-guilds.component.html',
  styleUrls: ['./dashboard-guilds.component.css']
})
export class DashboardGuildsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  guilds: object;

  ngOnInit() {
    this.http
      .get('https://api.campfirebot.xyz/users/me/guilds', {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        console.log(data);
        this.guilds = data;
      });
  }

  selectGuild(guildId) {
    this.http
      .post<GuildData>(
        `https://api.campfirebot.xyz/bot/check/server`,
        {
          id: guildId
        },
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        if (data.valid === true) {
          this.router.navigate([`/dashboard/guilds/${guildId}`]);
        } else {
          window.location.href =
            'https://discordapp.com/oauth2/authorize?client_id=579415199979798539&scope=bot&permissions=8';
        }
      });
  }
}
