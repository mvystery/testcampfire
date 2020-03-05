import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: firebase.User;

  theme: string;

  constructor(private service: LoginService, private router: Router) {
  }

  @Input() type: string;
  @Input() fixed: boolean;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        try {
          document.getElementById('campfireMenu').classList.remove('is-active');
          window['dataLayer'].push({'event': 'optimize.activate'});
        } catch {
        }
      }
    });

    this.service.getLoggedInUser().subscribe(user => {
      this.user = user;
    });

    window.onmessage = e => {
      if (e.origin === 'https://us-central1-campfire-640d7.cloudfunctions.net') {
        this.service.pushToken(e.data);
      }
    };

    const theme = localStorage.getItem('theme');
    if (theme === null) {
      this.theme = 'light';
      document.body.className = 'light-theme';
    } else if (theme === 'halloween') {
      this.theme = 'light';
      document.body.className = 'light-theme';
      localStorage.setItem('theme', 'light');
    } else {
      this.theme = theme;
      document.body.className = `light-theme`;
    }

    if (!this.type) {
      this.type = 'is-light';
    }
  }

  expand() {
    document.getElementById('campfireMenu').classList.toggle('is-active');
    document.querySelector('.navbar-burger').classList.toggle('is-active');
  }

  login() {
    this.service.login();
  }

  changeTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.body.className = `${theme}-theme`;
  }
}
