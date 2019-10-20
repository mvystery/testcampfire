import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  loadPresence(data) {
    this.router.navigate([`/presence/${data.value.query}`]);
  }
}
