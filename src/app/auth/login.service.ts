import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import Swal from 'sweetalert2';

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

  DiscordUsername: string;
  DiscordId: number;
  DiscordAvatar: string;

  private userSource = new BehaviorSubject('');
  currentUser = this.userSource.asObservable();

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private func: AngularFireFunctions) { }

  login() {
    window.open(
      // tslint:disable-next-line: max-line-length
      'https://discordapp.com/oauth2/authorize?client_id=579415199979798539&redirect_uri=https://us-central1-campfire-640d7.cloudfunctions.net/login&response_type=code&scope=identify%20guilds',
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
          resolve(res);
        },
        err => {
          if (err.code === 'auth/user-disabled') {
            Swal.fire('Account Disabled', 'Your account seems to have been disabled. Please join our Support Server for assistance', 'info');
          } else {
            reject(err);
          }
        }
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
      .get<UserData>('https://k2.campfirebot.xyz/auth/me', {
        headers: {
          Authorization: `${token}`
        }
      })
      .subscribe(data => {
        this.userSource.next(data.username);
      });

    const call = this.func.httpsCallable('userData');
    call({ auth: localStorage.getItem('auth') })
      .subscribe(data => {
        localStorage.setItem('id', data.id);
        localStorage.setItem(
          'avatar',
          `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
        );
        localStorage.setItem('username', data.username);
        this.userSource.next(data.username);
      });
  }
}
