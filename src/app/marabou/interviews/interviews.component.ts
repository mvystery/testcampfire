import { Component, OnInit } from '@angular/core';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
  host = '(host)';
  coordinator = '(coordinator)';
  time = '(time)';
  constructor() {}

  ngOnInit() {
    const clipboard = new ClipboardJS('.clip-button');

    clipboard.on('success', e => {
      e.trigger.classList.add('is-success');
      e.trigger.innerHTML = '<i class="far fa-clipboard"></i> Copied';
    });
  }

  setVars() {
    const hostUsername = (document.getElementById(
      'hostUsernameField'
    ) as HTMLInputElement).value;

    const coordinatorUsername = (document.getElementById(
      'coordinatorUsernameField'
    ) as HTMLInputElement).value;

    const timeValue = (document.getElementById('timeField') as HTMLInputElement)
      .value;

    this.host = hostUsername;
    this.coordinator = coordinatorUsername;
    this.time = timeValue;
  }
}
