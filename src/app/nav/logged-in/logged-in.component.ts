import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: '[app-logged-in]',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user: firebase.User;
  DiscordUser: string;

  constructor(private service: LoginService) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
      if (user) {
        const token = localStorage.getItem('auth');
        this.service.updateUser(token);
      }
    });

    this.service.currentUser.subscribe(user => (this.DiscordUser = user));
  }

  logout() {
    this.service.logout();
  }
}
