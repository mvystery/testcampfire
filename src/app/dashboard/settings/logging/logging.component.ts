import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  @Input() id: number;
  loadingData = true;

  constructor() { }

  ngOnInit() {
  }

}
