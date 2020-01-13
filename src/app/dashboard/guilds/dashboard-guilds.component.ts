import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireFunctions } from '@angular/fire/functions';

interface GuildData {
  valid: boolean;
}

@Component({
  selector: 'app-dashboard-guilds',
  templateUrl: './dashboard-guilds.component.html',
  styleUrls: ['./dashboard-guilds.component.css']
})
export class DashboardGuildsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private func: AngularFireFunctions) { }
  guilds: object;

  ngOnInit() {
    const call = this.func.httpsCallable('guilds');
    call({auth: localStorage.getItem('auth')})
    .subscribe(data => {
      this.guilds = data;
    });
  }

  selectGuild(guildId) {
    this.http
      .get<GuildData>(
        `https://root.campfirebot.xyz/api/check/${guildId}`
      )
      .subscribe(data => {
        console.log(data);
        if (data.valid === true) {
          this.router.navigate([`/dashboard/guilds/${guildId}`]);
        } else {
          window.open(
            // tslint:disable-next-line: max-line-length
            `https://discordapp.com/oauth2/authorize?client_id=579415199979798539&scope=bot&permissions=8&guild_id=${guildId}`,
            'Campfire | Add Guild',
            'menubar=no,width=500,height=720,location=no,resizable=no,scrollbars=yes,status=no'
          );
        }
      // tslint:disable-next-line: max-line-length
      }, error => { Swal.fire('Oh noes!', 'Looks like we\'re having some server errors. We\'ll work on fixing them! Bear with us!', 'error'); });
  }
}
