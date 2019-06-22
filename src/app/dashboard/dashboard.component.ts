import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

interface UserData {
  username: string;
  id: string;
  discriminator: string;
  avatar: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: firebase.User;
  balance: number;
  level: number;
  bubbles: number;
  avatar: string;
  name: string;

  userDocument: AngularFirestoreDocument;

  greeting: string;

  constructor(
    private service: LoginService,
    private router: Router,
    private db: AngularFirestore,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
      this.user = user;
      if (user) {
        this.db
          .collection('users')
          .doc(this.user.uid)
          .ref.onSnapshot(doc => {
            if (doc.exists) {
              this.balance = doc.data().balance;
              this.bubbles = doc.data().bubbles_popped;
              this.level = doc.data().level;
            }
          });
        this.avatar = localStorage.getItem('avatar');
        this.name = localStorage.getItem('username');
      }
    });

    const today = new Date();
    const timeNow = today.getHours();
    if (timeNow < 12) {
      this.greeting = 'Good morning';
    }

    if (timeNow >= 12) {
      this.greeting = 'Good afternoon';
    }

    if (timeNow >= 17) {
      this.greeting = 'Good evening';
    }
  }
}
