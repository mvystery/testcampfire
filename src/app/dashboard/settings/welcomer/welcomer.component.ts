import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcomer',
  templateUrl: './welcomer.component.html',
  styleUrls: ['./welcomer.component.css']
})
export class WelcomerComponent implements OnInit {
  @Input() id: number;

  loadingData = true;
  postsWelcomes: boolean;
  welcomeMessage: string;
  welcomeChannelName: string;
  welcomeSetLoading: boolean;
  welcomeSaving: boolean;


  constructor(private func: AngularFireFunctions, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`https://us-central1-campfire-640d7.cloudfunctions.net/welcome?server=${this.id}`, {
      headers: {
        Authorization: localStorage.getItem('auth')
      }
    }).subscribe(data => {
      if (data.auth === true) {
        if (data.exists === true) {
          if (data.postsWelcomes === true) {
            this.loadingData = false;
            this.postsWelcomes = true;
            this.welcomeMessage = data.welcomeInfo.welcomeMessage;
            this.welcomeChannelName = data.welcomeInfo.welcomeChannelName;
          } else {
            this.loadingData = false;
            this.postsWelcomes = false;
          }
        } else {
          Swal.fire('Whoops!', 'This server is broken. Ask support for help in our Discord server', 'error');
        }
      }
    });
  }

  enableWelcomer() {
    this.welcomeSetLoading = true;
    const call = this.func.httpsCallable('enableWelcome');
    call({auth: localStorage.getItem('auth'), server: this.id})
    .subscribe(data => {
      if (data.success === true) {
        this.welcomeSetLoading = false;
        this.postsWelcomes = true;
        this.welcomeMessage = '$user$ just joined $server$';
        this.welcomeChannelName = 'general';
      }
    });
  }

  disableWelcomer() {
    this.welcomeSetLoading = true;
    const call = this.func.httpsCallable('disableWelcome');
    call({auth: localStorage.getItem('auth'), server: this.id})
    .subscribe(data => {
      if (data.success === true) {
        this.welcomeSetLoading = false;
        this.postsWelcomes = false;
      }
    });
  }

  updateWelcomer(formData){
    this.welcomeSaving = true;
    const call = this.func.httpsCallable('updateWelcome');
    call({auth: localStorage.getItem('auth'), server: this.id, message: formData.value.message, channel: formData.value.channelName})
    .subscribe(data => {
      if (data.success === true) {
        this.welcomeSaving = false;
        Swal.fire({
          title: 'Sweet!',
          position: 'bottom',
          // tslint:disable-next-line: quotemark
          text: 'That\'s all done! Welcomer updated',
          type: 'success',
          toast: true,
          showConfirmButton: false,
          timer: 5000
        });
      } else {
        Swal.fire('Whoops!', 'This server is broken. Ask support for help in our Discord server', 'error');
      }
    });
  }

}
