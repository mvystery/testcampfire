import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { auth } from 'firebase';
import { AngularFireFunctions } from '@angular/fire/functions';
import Swal from 'sweetalert2';

interface GuildData {
  auth: boolean;
  name: string;
  id: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard-guild-manage',
  templateUrl: './dashboard-guild-manage.component.html',
  styleUrls: ['./dashboard-guild-manage.component.css']
})
export class DashboardGuildManageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private func: AngularFireFunctions
  ) { }

  id: number;
  auth: boolean;
  name: string;
  icon: string;
  tab = 'prefix';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    const call = this.func.httpsCallable('guildData');
    call({ sever: this.id, auth: localStorage.getItem('auth') })
      .subscribe(data => {
        console.log(data);
        data.map(mapped => {
          if (mapped.id === this.id) {
            this.id = mapped.id;
            this.name = mapped.name;
            this.icon = mapped.icon;
          }
        });
      });
  }

  getServerId() {
    return this.id;
  }

  changeTab(tab) {
    this.tab = tab;
  }
}
