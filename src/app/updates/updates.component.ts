import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  open = false;
  response: string;
  constructor() {}

  ngOnInit() {}

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  feedback(rev) {
    if (rev === 'yes') {
      this.response = 'Thank you!';
    } else if (rev === 'meh') {
      this.response = 'Thank you!';
    } else {
      // tslint:disable-next-line: quotemark
      this.response = "We're sorry!";
    }
  }
}
