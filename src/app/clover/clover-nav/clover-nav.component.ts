import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clover-nav',
  templateUrl: './clover-nav.component.html',
  styleUrls: ['./clover-nav.component.css']
})
export class CloverNavComponent implements OnInit {
  fixed: boolean;

  constructor() { }

  ngOnInit() {
  }

  searchAction(data) {
    console.log(data);
  }

  expand() {
    document.getElementById('campfireMenu').classList.toggle('is-active');
    document.querySelector('.navbar-burger').classList.toggle('is-active');
  }
}
