import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  step = 1;

  robloxUsername: string;

  code: string;

  constructor() {}

  ngOnInit() {
    const list = [
      'dog ',
      'cat ',
      'campfire ',
      'chicken ',
      'fish ',
      'meow ',
      'roblox ',
      'epic ',
      'friend ',
      'hello ',
      'hi ',
      'amazing ',
      'cool '
    ];

    const result =
      list[Math.floor(Math.random() * list.length)] +
      list[Math.floor(Math.random() * list.length)] +
      list[Math.floor(Math.random() * list.length)] +
      list[Math.floor(Math.random() * list.length)] +
      list[Math.floor(Math.random() * list.length)];
    this.code = result.slice(0, -1);
  }

  usernameForm(data) {
    this.robloxUsername = data.value.username;
    this.step = 2;
  }
}
