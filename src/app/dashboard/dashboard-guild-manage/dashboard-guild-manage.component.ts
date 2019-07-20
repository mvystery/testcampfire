import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { auth } from 'firebase';

interface GuildData {
  auth: boolean;
  name: string;
  id: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard-guild-manage',
  templateUrl: './dashboard-guild-manage.component.html',
  styleUrls: ['./dashboard-guild-manage.component.css']
})
export class DashboardGuildManageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id: number;
  auth: boolean;
  name: string;
  icon: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.http
      .post<GuildData>(
        `https://api.campfirebot.xyz/guilds/data`,
        {
          id: this.id
        },
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        if (data.auth) {
          this.id = data.id;
          this.name = data.name;
          this.icon = data.icon;
        }
      });
  }
}
