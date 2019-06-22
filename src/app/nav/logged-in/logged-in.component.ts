import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { HttpClient } from '@angular/common/http';

interface UserData {
  username: string;
  id: string;
  discriminator: string;
  avatar: string;
}

@Component({
  selector: '[app-logged-in]',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user: firebase.User;
  DiscordUser: string;
  DiscordAvatar: string;

  constructor(private service: LoginService, private http: HttpClient) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
      if (user) {
        const token = localStorage.getItem('auth');
        this.service.updateUser(token);

        this.http
          .get<UserData>('https://api.campfirebot.xyz/users/me', {
            headers: {
              Authorization: `${localStorage.getItem('auth')}`
            }
          })
          .subscribe(data => {
            localStorage.setItem('id', data.id);
            localStorage.setItem(
              'avatar',
              `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
            );
            localStorage.setItem('username', data.username);
            this.DiscordAvatar = `https://cdn.discordapp.com/avatars/${
              data.id
            }/${data.avatar}.png`;
          });
      }
    });

    this.service.currentUser.subscribe(user => (this.DiscordUser = user));
  }

  logout() {
    this.service.logout();
  }
}
