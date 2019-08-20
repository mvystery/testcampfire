import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randomMessage: string;

  constructor() {}

  ngOnInit() {
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
}
