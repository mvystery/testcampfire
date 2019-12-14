import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prefix',
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.css']
})
export class PrefixComponent implements OnInit {
  @Input() id: number;
  loadingData = true;
  prefix: string;
  settingPrefix: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`https://root.campfirebot.xyz/api/${this.id}/prefix`, {
      headers: {
        Authorization: localStorage.getItem('auth')
      }
    }).subscribe(data => {
      if (data.auth === false) {
        Swal.fire('Whoops!', 'Looks like we messed up a little. Try logging out and logging back in', 'error');
      } else {
        this.prefix = data.prefix;
        this.loadingData = false;
      }
    });
  }

  setPrefix(data) {
    this.settingPrefix = true;
    this.http.post(`https://root.campfirebot.xyz/api/${this.id}/prefix`, {prefix: data.value.prefix}, {
      headers: {
        Authorization: localStorage.getItem('auth')
      }
    }).subscribe(returnData => {
      this.settingPrefix = false;
      Swal.fire({
        title: 'All done!',
        position: 'bottom',
        // tslint:disable-next-line: quotemark
        text: 'Your prefix was set',
        type: 'success',
        toast: true,
        showConfirmButton: false,
        timer: 5000
      });
    });
  }

}
