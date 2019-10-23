import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  guilds: object;
  stepOne: boolean;
  stepTwo: boolean;
  guildName: string;

  ngOnInit() {
    this.http
      .get<any>('https://api.campfirebot.xyz/users/me/guilds', {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        this.stepOne = true;
        this.guilds = data;
      });
  }

  loadPresence(data) {
    this.router.navigate([`/presence/${data.value.query}`]);
  }

  selectGuild(guildId, guildName) {
    this.http
      .post<any>(
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
          this.stepOne = false;
          this.stepTwo = true;
          this.guildName = guildName;
        } else {
          // tslint:disable-next-line: max-line-length
          window.location.href = `https://discordapp.com/oauth2/authorize?client_id=579415199979798539&scope=bot&permissions=8&guild_id=${guildId}`;
        }
      });
  }
}
