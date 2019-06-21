import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: firebase.User;

  constructor(private service: LoginService) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
    });

    window.onmessage = e => {
      if (e.origin === 'https://api.campfirebot.xyz') {
        this.service.pushToken(e.data);
      }
    };
  }

  expand() {
    document.getElementById('campfireMenu').classList.toggle('is-active');
  }

  login() {
    this.service.login();
  }
}
