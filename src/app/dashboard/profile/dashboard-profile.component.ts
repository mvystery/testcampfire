import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { EmojifyPipe } from 'angular-emojify';

interface CallbackData {
  status: string;
}

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
  avatar: string;
  name: string;
  color = '#975999';
  balance: number;
  level: number;
  reputation: number;
  xp: number;
  nationality: string;
  bio: string;
  formattedNat: string;
  flag: string;
  user: firebase.User;
  authToken: string;
  submittingData = false;

  constructor(
    private service: LoginService,
    private http: HttpClient,
    private db: AngularFirestore,
    private router: Router,
    private emojify: EmojifyPipe
  ) { }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      } else if (user) {
        this.user = user;
        this.db
          .collection('users')
          .doc(this.user.uid)
          .ref.onSnapshot(doc => {
            if (doc.exists) {
              this.color = doc.data().favColor;
              this.balance = doc.data().balance;
              this.color = doc.data().favColor;
              this.level = doc.data().level;
              this.reputation = doc.data().reputation;
              this.xp = doc.data().xp;
              let country = doc.data().country;
              country = country.replace(/_/g, '-');
              const takenAwayColon = country.replace(/:/g, '');
              this.nationality = doc.data().country;
              this.formattedNat = this.emojify.transform(country);
              this.flag = takenAwayColon.replace('flag-', '');
              this.bio = doc.data().userDescription;
              this.authToken = doc.data().authToken;
            }
          });
      }
    });
  }

  openModal() {
    document.getElementById('updateProfile').classList.add('is-active');
  }

  closeModal() {
    document.getElementById('updateProfile').classList.remove('is-active');
  }

  updateProfile(data) {
    this.submittingData = true;
    const nationality = data.value.nationality;
    const bio = data.value.bio;
    console.log(this.color);

    document.getElementById('errorArea').innerHTML = '';

    if (!nationality.includes('flag')) {
      return (document.getElementById(
        'errorArea'
      ).innerHTML = `<div class="notification is-danger">That's not a valid nationality. Sorry!</div>`);
    }

    if (bio.length < 5) {
      return (document.getElementById(
        'errorArea'
      ).innerHTML = `<div class="notification is-danger">That's not a valid bio. Sorry!</div>`);
    }

    const packagedData = {
      nationality: data.value.nationality,
      bio: data.value.bio,
      color: this.color
    };
    console.log('posting');
    this.http
      .post<CallbackData>(
        'https://k2.campfirebot.xyz/profile/update',
        packagedData,
        {
          headers: {
            Authorization: this.authToken,
            'Content-Type': 'application/json'
          }
        }
      )
      .subscribe(dse => {
        if (dse.status === 'success') {
          window.location.reload();
        }
      });
  }
}
