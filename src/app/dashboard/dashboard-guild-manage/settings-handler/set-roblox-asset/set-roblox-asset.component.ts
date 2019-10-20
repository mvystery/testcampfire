import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardGuildManageComponent } from '../../dashboard-guild-manage.component';
import Swal from 'sweetalert2';

interface VerifyData {
  enabled: boolean;
  groupId: number;
  verifiedRole: string;
  bindsOn: boolean;
  binds: Array<any>;
}

interface Callback {
  completed: boolean;
}

@Component({
  selector: 'app-set-roblox-asset',
  templateUrl: './set-roblox-asset.component.html',
  styleUrls: ['./set-roblox-asset.component.css']
})
export class SetRobloxAssetComponent implements OnInit {
  loaded = false;

  enabled = false;
  status = 'Disabled';
  role: string;
  groupId: number;
  roles = [];

  constructor(
    private http: HttpClient,
    private guildMan: DashboardGuildManageComponent
  ) {}

  ngOnInit() {
    this.http
      .get<VerifyData>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/verify`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        this.loaded = true;
        if (data.enabled) {
          this.enabled = true;
          this.status = 'Enabled';
          this.groupId = data.groupId;
          this.role = data.verifiedRole;
          this.roles = data.binds;
        } else {
          this.enabled = false;
          this.status = 'Disabled';
        }
      });
  }

  bindsForm(data) {
    this.roles.push({ name: data.value.roleName, id: data.value.gr1 });
    console.log(this.roles);
  }

  delBind(bind) {
    this.roles.splice(this.roles.findIndex(objecto => objecto.id === bind), 1);
  }

  saveBinds() {
    const result = this.roles.reduce((map, obj) => {
      map[obj.id] = obj.name;
      return map;
    }, {});

    this.http
      .post<Callback>(
        `https://api.campfirebot.xyz/settings/${this.guildMan.getServerId()}/binds`,
        {
          binds: result
        },
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(data => {
        if (data.completed === true) {
          document.getElementById('saveButton').classList.add('is-success');
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
          setTimeout(() => {
            document
              .getElementById('saveButton')
              .classList.remove('is-success');
          }, 2000);
        }
      });
  }
}
