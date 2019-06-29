import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface UserData {
  username: string;
  id: string;
  discriminator: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userToken: string;
  userAvatar: string;

  private userSource = new BehaviorSubject('');
  currentUser = this.userSource.asObservable();

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  login() {
    window.open(
      // tslint:disable-next-line: max-line-length
      'https://discordapp.com/oauth2/authorize?client_id=579415199979798539&redirect_uri=https%3A%2F%2Fapi.campfirebot.xyz%2Flogin&response_type=code&scope=identify%20guilds',
      'Campfire',
      'menubar=no,width=500,height=720,location=no,resizable=no,scrollbars=yes,status=no'
    );
  }

  pushToken(tokenData) {
    return new Promise<any>((resolve, reject) => {
      this.userToken = tokenData.token;
      this.afAuth.auth.signInWithCustomToken(tokenData.auth).then(
        res => {
          localStorage.setItem('auth', tokenData.token);
          this.http
            .get<UserData>('https://api.campfirebot.xyz/users/me', {
              headers: {
                Authorization: `${tokenData.token}`
              }
            })
            .subscribe(data => {
              this.userSource.next(data.username);
            });
          resolve(res);
        },
        err => reject(err)
      );
    });
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    localStorage.removeItem('id');
  }

  getToken() {
    return this.userToken;
  }

  updateUser(token: string) {
    this.http
      .get<UserData>('https://api.campfirebot.xyz/users/me', {
        headers: {
          Authorization: `${token}`
        }
      })
      .subscribe(data => {
        this.userSource.next(data.username);
      });
  }
}
