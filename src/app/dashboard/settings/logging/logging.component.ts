import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  @Input() id: number;
  loadingData = true;
  editMessage: boolean;
  joinLeave: boolean;
  kickBan: boolean;
  deletionOfMessage: boolean;
  voice: boolean;
  channelName: string;
  savingFormData: boolean;

  constructor(private func: AngularFireFunctions) { }

  ngOnInit() {
    const call = this.func.httpsCallable('loggingLoad');
    call({ auth: localStorage.getItem('auth'), server: this.id })
      .subscribe(data => {
        if (data.auth === true) {
          if (data.logging === true) {
            this.loadingData = false;
            this.editMessage = data.loggingData.editMessage;
            this.joinLeave = data.loggingData.joinLeave;
            this.kickBan = data.loggingData.kickBan;
            this.deletionOfMessage = data.loggingData.deletionOfMessage;
            this.voice = data.loggingData.voice;
            this.channelName = data.loggingData.channelName;
          } else {
            this.loadingData = false;
            this.editMessage = false;
            this.joinLeave = false;
            this.kickBan = false;
            this.deletionOfMessage = false;
            this.voice = false;
          }
        } else {
          Swal.fire('Whoops!', 'Authetication Error', 'error');
        }
      });
  }

  updateLogger(data) {
    this.savingFormData = true;
    console.log(data.form.value);
    const call = this.func.httpsCallable('loggingSet');
    call({ auth: localStorage.getItem('auth'), server: this.id, data: data.form.value }).subscribe(returned => {
      if (returned.success === true) {
        this.savingFormData = false;
        Swal.fire({
          title: 'All done!',
          position: 'bottom',
          // tslint:disable-next-line: quotemark
          text: 'Your logger was updated',
          type: 'success',
          toast: true,
          showConfirmButton: false,
          timer: 5000
        });
      } else {
        this.savingFormData = false;
        Swal.fire('Whoops!', 'We hit an error. Try again or contact support', 'error');
      }
    });
  }
}
