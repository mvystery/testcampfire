import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../auth/login.service';

declare var Chargebee: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
  randomMessage: string;

  constructor(private service: LoginService) { }

  sparkBill: boolean;
  infernoBill: boolean;

  user: firebase.User;
  username: string;

  ngAfterViewInit() {
    Chargebee.registerAgain();
  }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.username = localStorage.getItem('username');
        console.log(user);
      }
    });

    const messageArray = [
      'social-ing',
      'community',
      'magic',
      'activity',
      'power'
    ];

    this.randomMessage =
      messageArray[Math.floor(Math.random() * messageArray.length)];
  }

  startBillingSpark() {
    this.sparkBill = true;
  }

  closeSpark() {
    this.sparkBill = false;
  }

  startBillingInferno() {
    this.infernoBill = true;
  }

  closeInferno() {
    this.infernoBill = false;
  }

  monthlyBill() {
    const customer = { cf_discord: `ID: ${this.user.uid}` };
    const cbInstance = Chargebee.getInstance();
    const cart = cbInstance.getCart();
    const product = cbInstance.initializeProduct('pro_month');
    cart.setCustomer(customer);
    cart.replaceProduct(product);
    cart.proceedToCheckout();
  }

  annualBill() {
    const customer = { cf_discord: `ID: ${this.user.uid}` };
    const cbInstance = Chargebee.getInstance();
    const cart = cbInstance.getCart();
    const product = cbInstance.initializeProduct('pro_annual');
    cart.setCustomer(customer);
    cart.replaceProduct(product);
    cart.proceedToCheckout();
  }
}
