import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ClipboardJS from 'clipboard';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  step = 1;

  loadingSystem = true;
  robloxUsername: string;
  readyForRoblox: boolean;
  error: boolean;
  loadingSubmit: boolean;
  code: string;

  finalStepError: string;

  constructor(private func: AngularFireFunctions) {}

  ngOnInit() {
    const clipboard = new ClipboardJS('.clip-button');

    clipboard.on('success', e => {
      e.trigger.classList.add('is-success');
      e.trigger.innerHTML = '<i class="far fa-clipboard"></i> Copied';
    });

    const call = this.func.httpsCallable('verifyOnline');
    call({}).subscribe(data => {
      this.loadingSystem = false;
      if (data.ready === true) {
          this.readyForRoblox = true;
          console.log(data.code);
          this.code = data.code;
        } else {
          this.readyForRoblox = false;
          this.error = true;
        }
    });
  }

  usernameForm(data) {
    this.robloxUsername = data.value.username;
    this.step = 2;
  }

  forceVerify() {
    this.step = 1;
    this.error = false;
    const call = this.func.httpsCallable('verifyOnlineForce');
    call({})
      .subscribe(data => {
        if (data.ready === true) {
          this.readyForRoblox = true;
          console.log(data.code);
          this.code = data.code;
        } else {
          this.readyForRoblox = false;
          this.error = true;
        }
      });
  }

  verifyCodeDone() {
    this.loadingSubmit = true;
    const call = this.func.httpsCallable('verifyOnlineComplete');
    call({robloxUsername: this.robloxUsername})
      .subscribe(data => {
        if (data.success) {
          this.loadingSubmit = false;
          this.step = 3;
        } else {
          this.loadingSubmit = false;
          this.step = 4;
          this.finalStepError = data.reason;
        }
      });
  }

  goBackToStart() {
    this.step = 1;
    this.robloxUsername = '';
  }
}
