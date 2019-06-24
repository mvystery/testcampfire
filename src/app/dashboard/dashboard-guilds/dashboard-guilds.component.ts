import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-guilds',
  templateUrl: './dashboard-guilds.component.html',
  styleUrls: ['./dashboard-guilds.component.css']
})
export class DashboardGuildsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://api.campfirebot.xyz/users/me/guilds', {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        console.log(data);
      });
  }
}
