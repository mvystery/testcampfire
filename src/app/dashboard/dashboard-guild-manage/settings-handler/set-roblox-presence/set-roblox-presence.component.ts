import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DashboardGuildManageComponent } from '../../dashboard-guild-manage.component';

@Component({
  selector: 'app-set-roblox-presence',
  templateUrl: './set-roblox-presence.component.html',
  styleUrls: ['./set-roblox-presence.component.css']
})
export class SetRobloxPresenceComponent implements OnInit {
  loaded = false;
  errorText = false;
  groupName: string;
  groupId: number;
  presenceLoading: boolean;

  presence: boolean;

  robloxVerificationOff: boolean;

  doesNotHaveVerify: boolean;

  constructor(
    private http: HttpClient,
    private guildMan: DashboardGuildManageComponent,
    private router: Router
  ) {}

  ngOnInit() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/verify`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        if (data.groupId !== undefined) {
          const groupId = data.groupId;
          this.groupId = data.groupId;

          this.http
            .get<any>(`https://api.campfirebot.xyz/presence/checkgroups`, {
              headers: {
                Authorization: localStorage.getItem('auth')
              }
            })
            .subscribe(presenceData => {
              if (presenceData.success) {
                const result = presenceData.result.filter(
                  groupItem => groupItem.group.id === parseInt(groupId, 0)
                );
                if (result.length === 1) {
                  this.http
                    .get<any>(
                      `https://api.campfirebot.xyz/presence/check/${groupId}`,
                      {
                        headers: {
                          Authorization: localStorage.getItem('auth')
                        }
                      }
                    )
                    .subscribe(presenceEnabledData => {
                      if (presenceEnabledData.exists) {
                        this.presence = true;
                        this.loaded = true;
                      } else {
                        this.presence = false;
                        this.loaded = true;
                      }
                    });
                  this.groupName = result[0].group.name;
                } else {
                  this.loaded = true;
                  this.errorText = true;
                }
              } else {
                this.loaded = true;
                this.doesNotHaveVerify = true;
              }
            });
        } else {
          Swal.fire({
            title: 'Error',
            text:
              'You need to enable Verification in the Verification tab to use this feature',
            type: 'error'
          }).then(result => {
            window.location.reload();
          });
        }
      });
  }

  createPresence() {
    this.presenceLoading = true;
    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/create/${this.groupId}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        if (data.success) {
          this.presenceLoading = false;
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 2000
          });

          this.presence = true;
        } else {
          Swal.fire({
            title: 'Whoops!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: data.reason,
            type: 'error',
            toast: true,
            showConfirmButton: false,
            timer: 2000
          });
          this.presence = false;
        }
      });
  }
}
