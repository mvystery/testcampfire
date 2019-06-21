import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: '[app-logged-in]',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user: firebase.User;

  constructor(private service: LoginService) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.service.logout();
  }
}
