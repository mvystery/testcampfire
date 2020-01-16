import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clover-unav',
  templateUrl: './clover-unav.component.html',
  styleUrls: ['./clover-unav.component.css']
})
export class CloverUnavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  expand() {
    document.getElementById('clMenu').classList.toggle('is-active');
  }

}
