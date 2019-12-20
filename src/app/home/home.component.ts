import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randomMessage: string;

  constructor(private service: LoginService) {}

  sparkBill: boolean;
  infernoBill: boolean;

  user: firebase.User;
  username: string;

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.username = localStorage.getItem('username');
      }
    });

    const messageArray = [
      'social-ing',
      'community',
      'magic',
      'activity',
      'power'
    ];

    this.randomMessage =
      messageArray[Math.floor(Math.random() * messageArray.length)];
  }

  startBillingSpark() {
    this.sparkBill = true;
  }

  closeSpark() {
    this.sparkBill = false;
  }

  startBillingInferno() {
    this.infernoBill = true;
  }

  closeInferno() {
    this.infernoBill = false;
  }
}
