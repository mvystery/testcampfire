import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-prefix',
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.css']
})
export class PrefixComponent implements OnInit {
  @Input() id: number;
  loadingData = true;
  prefix: string;
  settingPrefix: boolean;
  authToken: string;

  constructor(private service: LoginService, private http: HttpClient, private db: AngularFirestore) { }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        this.db.collection('users').doc(user.uid).ref.get().then(doc => {
          if (doc.exists) {
            this.authToken = doc.data().authToken;
            this.http.get<any>(`https://root.campfirebot.xyz/api/${this.id}/prefix`, {
              headers: {
                Authorization: doc.data().authToken
              }
            }).subscribe(data => {
              if (data.auth === false) {
                Swal.fire('Whoops!', 'Looks like we messed up a little. Try logging out and logging back in', 'error');
              } else {
                this.prefix = data.prefix;
                this.loadingData = false;
              }
            });
          }
        });
      }
    });
  }

  setPrefix(data) {
      this.settingPrefix = true;
      this.http.post(`https://root.campfirebot.xyz/api/${this.id}/prefix`, { prefix: data.value.prefix }, {
        headers: {
          Authorization: this.authToken
        }
      }).subscribe(returnData => {
        this.settingPrefix = false;
        Swal.fire({
          title: 'All done!',
          position: 'bottom',
          // tslint:disable-next-line: quotemark
          text: 'Your prefix was set',
          type: 'success',
          toast: true,
          showConfirmButton: false,
          timer: 5000
        });
      });
    }

}
