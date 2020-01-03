import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';

declare var Chargebee: any;

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
    Chargebee.registerAgain();
    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
      localStorage.setItem('fs_userdeta', this.user.displayName);
      localStorage.setItem('fs_useridea', this.user.uid);
      if (localStorage.getItem('lapse')) {
        if ((parseFloat(localStorage.getItem('lapse')) + 6.048e+8) < new Date().getTime()) {
          this.service.logout();
        }
      } else {
        localStorage.setItem('lapse', new Date().getTime().toString());
      }
    });
  }

  logout() {
    this.service.logout();
  }
}
