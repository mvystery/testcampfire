import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';

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

  constructor(private service: LoginService, private http: HttpClient, private func: AngularFireFunctions) { }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
      if (user) {
        const token = localStorage.getItem('auth');
        if (localStorage.getItem('username') === null) {
          const call = this.func.httpsCallable('userData');
          call({ auth: localStorage.getItem('auth') })
            .subscribe(data => {
              localStorage.setItem('username', data.username);
              localStorage.setItem('id', data.id);
              localStorage.setItem(
                'avatar',
                `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
              );

              this.DiscordUser = data.username;
              this.DiscordAvatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`;
            });
        } else {
          this.DiscordUser = localStorage.getItem('username');
          this.DiscordAvatar = localStorage.getItem('avatar');
        }
      }
    });
  }

  logout() {
    this.service.logout();
  }
}
