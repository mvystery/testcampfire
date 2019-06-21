import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userToken: string;
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  login() {
    window.open(
      // tslint:disable-next-line: max-line-length
      'https://discordapp.com/oauth2/authorize?client_id=579415199979798539&redirect_uri=https%3A%2F%2Fapi.campfirebot.xyz%2Flogin&response_type=code&scope=identify%20email%20guilds',
      'Campfire',
      'menubar=no,width=500,height=720,location=no,resizable=no,scrollbars=yes,status=no'
    );
  }

  pushToken(tokenData) {
    console.log(tokenData);
    return new Promise<any>((resolve, reject) => {
      this.userToken = tokenData.token;
      this.afAuth.auth.signInWithCustomToken(tokenData.auth).then(
        res => {
          this.http
            .get('http://discordapp.com/api/users/@me', {
              headers: {
                Authorization: `Bearer ${tokenData.token}`
              }
            })
            .subscribe();
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
  }

  getToken() {
    return this.userToken;
  }
}
