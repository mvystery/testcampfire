import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: firebase.User;
  balance: number;

  userDocument: AngularFirestoreDocument;

  constructor(
    private service: LoginService,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
      this.user = user;

      this.db
        .collection('users')
        .doc(this.user.uid)
        .ref.get()
        .then(doc => {
          if (doc.exists) {
            this.balance = doc.data().balance;
          }
        });
    });
  }
}
