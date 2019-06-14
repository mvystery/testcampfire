import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  expand() {
    document.getElementById('campfireMenu').classList.toggle('is-active');
  }
}
