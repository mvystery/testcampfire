import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roblox',
  templateUrl: './roblox.component.html',
  styleUrls: ['./roblox.component.css']
})
export class RobloxComponent implements OnInit {
  @Input() id: number;

  loadingData = true;
  groupId: number;
  verifiedRole: string;
  binds = [];
  savingVerifyData: boolean;
  verificationEnabled: boolean;
  disablingVerification: boolean;
  catchVerify: boolean;

  bindsModal: boolean;

  constructor(private func: AngularFireFunctions) { }

  ngOnInit() {
    const call = this.func.httpsCallable('getRoblox');
    call({ server: this.id })
      .subscribe(data => {
        if (data.auth === true) {
          if (data.roblox === true) {
            this.loadingData = false;
            this.verificationEnabled = true;
            this.groupId = data.groupId;
            this.verifiedRole = data.verifiedRole;
            this.catchVerify = data.robloxCatch
            if (data.bindsSetup === true) {
              Object.keys(data.binds).forEach(key => {
                this.binds.push({
                  id: parseFloat(key),
                  name: data.binds[key]
                });
              });
            }
          } else {
            this.loadingData = false;
            this.verificationEnabled = false;
          }
        }
      });
  }

  openBindsModal() {
    this.bindsModal = true;
  }

  closeBindsModal() {
    this.bindsModal = false;
  }

  updateBinds(data) {
    if (data.value.groupRole > 255) {
      Swal.fire('Nuh-uh', 'Group roles can\'t go over 255', 'error');
    } else if (data.value.groupRole < 1) {
      Swal.fire('Nuh-uh', 'Group roles can\'t go under 1', 'error');
    } else {
      if (this.binds.findIndex(objecto => objecto.id === data.value.groupRole) !== -1) {
        this.binds.splice(this.binds.findIndex(objecto => objecto.id === data.value.groupRole), 1);
      }
      this.binds.push({ name: data.value.roleName, id: data.value.groupRole });
    }
  }

  deleteBind(bind) {
    this.binds.splice(this.binds.findIndex(objecto => objecto.id === bind), 1);
  }

  updateVerification(data) {
    this.savingVerifyData = true;
    const call = this.func.httpsCallable('setRoblox');

    const result = this.binds.reduce((map, obj) => {
      map[obj.id] = obj.name;
      return map;
    }, {});

    // tslint:disable-next-line: max-line-length
    call({ server: this.id, verifiedRole: data.value.verifiedRole, groupId: data.value.groupId, binds: result, robloxCatch: data.value.catchVerify })
      .subscribe(callback => {
        if (callback.success === true) {
          this.savingVerifyData = false;
          Swal.fire({
            title: 'Yahoo!',
            position: 'bottom',
            // tslint:disable-next-line: quotemark
            text: 'Verification updated',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
        } else {
          this.savingVerifyData = false;
          Swal.fire('Whoops!', 'We hit an error. Try again or contact support', 'error');
        }
      });
  }

  enabledVerification() {
    this.verificationEnabled = true;
  }

  disableVerification() {
    this.disablingVerification = true;
    const call = this.func.httpsCallable('disableRoblox');
    call({ server: this.id }).subscribe(callback => {
      if (callback.success === true) {
        this.disablingVerification = false;
        this.verificationEnabled = false;
        Swal.fire({
          title: 'All set!',
          position: 'bottom',
          // tslint:disable-next-line: quotemark
          text: 'Verification disabled',
          type: 'success',
          toast: true,
          showConfirmButton: false,
          timer: 5000
        });
      } else {
        this.disablingVerification = false;
        Swal.fire('Whoops!', 'We hit an error. Try again or contact support', 'error');
      }
    });
  }
}
