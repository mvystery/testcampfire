import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../auth/login.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-pro-trial',
  templateUrl: './pro-trial.component.html',
  styleUrls: ['./pro-trial.component.css']
})
export class ProTrialComponent implements OnInit {
  dealVisible: boolean;
  loadingDeal: boolean;
  user: firebase.User;

  childrenInNeedBill: boolean;

  constructor(
    private service: LoginService,
    private http: HttpClient,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.childrenInNeedBill = false;
      }
    });
  }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        if (localStorage.getItem('voucher2xClosed') === 'true') {
          this.dealVisible = false;
        } else {
          this.dealVisible = false;
        }
      }
      this.user = user;
    });
  }

  closeADeal() {
    Swal.fire({
      title: 'Are you sure?',
      text:
        // tslint:disable-next-line: quotemark
        "This is a one time offer. Once you've closed it, you can't get it back!",
      type: 'warning',
      showCancelButton: true,
      // tslint:disable-next-line: quotemark
      cancelButtonText: "I don't want the offer",
      confirmButtonText: 'I want to keep the offer'
    }).then(result => {
      if (!result.value) {
        this.dealVisible = false;
        localStorage.setItem('voucher1xClosed', 'true');
      }
    });
  }

  closeDeal() {
    this.dealVisible = false;
    localStorage.setItem('voucher2xClosed', 'true');
  }

  closeChildrenInNeed() {
    this.childrenInNeedBill = false;
  }

  getDeal() {
    this.childrenInNeedBill = true;
  }

  getADeal() {
    this.loadingDeal = true;
    this.http
      .get<any>('https://api.campfirebot.xyz/pro/redeem', {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        this.loadingDeal = false;
        if (data.completed === true) {
          Swal.fire({
            // tslint:disable-next-line: quotemark
            title: "That's done!",
            // tslint:disable-next-line: quotemark
            text: "You've got 14 days of PRO starting now! Enjoy it!",
            type: 'success',
            footer: data.reason
          });
          this.dealVisible = false;
          localStorage.setItem('voucher1xClosed', 'true');
        } else {
          Swal.fire({
            // tslint:disable-next-line: quotemark
            title: 'Whoops!',
            // tslint:disable-next-line: quotemark
            text: data.reason,
            type: 'error'
          });
        }
      });
  }
}
