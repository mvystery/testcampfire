import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var Stripe; // : stripe.StripeStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private service: LoginService,
    private http: HttpClient,
    private router: Router
  ) {}

  @Input() amount: number;
  @Input() description: string;
  @ViewChild('cardElement') cardElement: ElementRef;

  stripe: any; // : stripe.Stripe;
  card: any;
  cardErrors: any = false;

  loading = false;
  confirmation: any;

  stripeClientSecret: string;

  user: firebase.User;

  ngOnInit() {
    this.stripe = Stripe('pk_live_m72qbLRg6uYvEBGNsZpjfeWK009RS15GFI');
    const elements = this.stripe.elements();

    this.card = elements.create('card', {
      hidePostalCode: true
    });
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });

    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    this.http
      .get<any>(
        `https://payments.campfirebot.xyz/stripe/intent/${this.amount}`,
        {
          headers: {
            userid: localStorage.getItem('id')
          }
        }
      )
      .subscribe(intent => {
        console.log(intent);
        this.stripeClientSecret = intent.client_secret;
      });
  }

  async handleForm(e) {
    this.loading = true;
    const { paymentIntent, error } = await this.stripe.handleCardPayment(
      this.stripeClientSecret,
      this.card,
      {
        payment_method_data: {
          billing_details: { name: localStorage.getItem('id') }
        }
      }
    );

    console.log(paymentIntent);

    if (error) {
      this.loading = false;
      this.cardErrors = error.message;
    } else {
      this.loading = false;
      this.router.navigate(['/thank-you']);
    }
  }
}
