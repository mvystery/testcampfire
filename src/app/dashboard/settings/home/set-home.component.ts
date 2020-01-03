import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-set-home',
  templateUrl: './set-home.component.html',
  styleUrls: ['./set-home.component.css']
})

export class SetHomeComponent implements OnInit {
  @Input() id: number;

  loadingData = true;
  communityDays: any;
  communityHours: any;
  mostActiveDay: string;
  mostActiveHour: string;
  messagesSent: number;
  usersBanned: number;
  usersJoined: number;
  usersLeft: number;
  noData: boolean;

  constructor(private http: HttpClient, private db: AngularFirestore, private service: LoginService, ) { }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        this.db
          .collection('users')
          .doc(user.uid).ref.get().then(doc => {
            if (doc.exists) {
              this.http.get<any>(`https://us-central1-cf-gravity.cloudfunctions.net/getData?server=${this.id}`, {
                headers: {
                  Authorization: doc.data().authToken
                }
              }).subscribe(data => {
                if (data.auth === false) {
                  Swal.fire('Whoops!', 'Looks like we messed up a little. Try logging out and logging back in', 'error');
                } else {
                  this.loadingData = false;
                  if (data.exists === false) { this.noData = true; }
                  this.communityDays = new Chart('communityDays', {
                    type: 'line',
                    data: {
                      labels: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'
                      ],
                      datasets: [
                        {
                          label: 'This week',
                          data: [
                            data.messagesThisWeek[1],
                            data.messagesThisWeek[2],
                            data.messagesThisWeek[3],
                            data.messagesThisWeek[4],
                            data.messagesThisWeek[5],
                            data.messagesThisWeek[6],
                            data.messagesThisWeek[7],
                          ],
                          fill: false,
                          lineTension: 0.3,
                          backgroundColor: '#8520f7',
                          borderColor: '#8520f7',
                          borderWidth: 3,
                          pointRadius: 3
                        }
                      ]
                    },
                    options: {
                      legend: {
                        display: false,
                        position: 'bottom'
                      },
                      title: {
                        text: 'Line Chart',
                        display: false
                      },
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              display: false
                            },
                            gridLines: {
                              zeroLineColor: 'transparent',
                              zeroLineWidth: 2,
                              drawTicks: false,
                              drawBorder: false,
                              color: 'transparent'
                            }
                          }
                        ]
                      }
                    }
                  });

                  const resultDays = Math.max(
                    data.messagesThisWeek[1],
                    data.messagesThisWeek[2],
                    data.messagesThisWeek[3],
                    data.messagesThisWeek[4],
                    data.messagesThisWeek[5],
                    data.messagesThisWeek[6],
                    data.messagesThisWeek[7]);

                  const resultHours = Math.max(
                    data.hourBreakdown[0],
                    data.hourBreakdown[1],
                    data.hourBreakdown[2],
                    data.hourBreakdown[3],
                    data.hourBreakdown[4],
                    data.hourBreakdown[5],
                    data.hourBreakdown[6],
                    data.hourBreakdown[7],
                    data.hourBreakdown[8],
                    data.hourBreakdown[9],
                    data.hourBreakdown[10],
                    data.hourBreakdown[11],
                    data.hourBreakdown[12],
                    data.hourBreakdown[13],
                    data.hourBreakdown[14],
                    data.hourBreakdown[15],
                    data.hourBreakdown[16],
                    data.hourBreakdown[17],
                    data.hourBreakdown[18],
                    data.hourBreakdown[19],
                    data.hourBreakdown[20],
                    data.hourBreakdown[21],
                    data.hourBreakdown[22],
                    data.hourBreakdown[23]);

                  this.messagesSent = data.messagesSent;
                  this.usersBanned = data.usersBanned;
                  this.usersJoined = data.usersJoined;
                  this.usersLeft = data.usersLeft;

                  if (data.hourBreakdown[0] === resultHours) {
                    this.mostActiveHour = '00';
                  } else if (data.hourBreakdown[1] === resultHours) {
                    this.mostActiveHour = '01';
                  } else if (data.hourBreakdown[2] === resultHours) {
                    this.mostActiveHour = '02';
                  } else if (data.hourBreakdown[3] === resultHours) {
                    this.mostActiveHour = '03';
                  } else if (data.hourBreakdown[4] === resultHours) {
                    this.mostActiveHour = '04';
                  } else if (data.hourBreakdown[5] === resultHours) {
                    this.mostActiveHour = '05';
                  } else if (data.hourBreakdown[6] === resultHours) {
                    this.mostActiveHour = '06';
                  } else if (data.hourBreakdown[7] === resultHours) {
                    this.mostActiveHour = '07';
                  } else if (data.hourBreakdown[8] === resultHours) {
                    this.mostActiveHour = '08';
                  } else if (data.hourBreakdown[9] === resultHours) {
                    this.mostActiveHour = '09';
                  } else if (data.hourBreakdown[10] === resultHours) {
                    this.mostActiveHour = '10';
                  } else if (data.hourBreakdown[11] === resultHours) {
                    this.mostActiveHour = '11';
                  } else if (data.hourBreakdown[12] === resultHours) {
                    this.mostActiveHour = '12';
                  } else if (data.hourBreakdown[13] === resultHours) {
                    this.mostActiveHour = '13';
                  } else if (data.hourBreakdown[14] === resultHours) {
                    this.mostActiveHour = '14';
                  } else if (data.hourBreakdown[15] === resultHours) {
                    this.mostActiveHour = '15';
                  } else if (data.hourBreakdown[16] === resultHours) {
                    this.mostActiveHour = '16';
                  } else if (data.hourBreakdown[17] === resultHours) {
                    this.mostActiveHour = '17';
                  } else if (data.hourBreakdown[18] === resultHours) {
                    this.mostActiveHour = '18';
                  } else if (data.hourBreakdown[19] === resultHours) {
                    this.mostActiveHour = '19';
                  } else if (data.hourBreakdown[20] === resultHours) {
                    this.mostActiveHour = '20';
                  } else if (data.hourBreakdown[21] === resultHours) {
                    this.mostActiveHour = '21';
                  } else if (data.hourBreakdown[22] === resultHours) {
                    this.mostActiveHour = '22';
                  } else if (data.hourBreakdown[23] === resultHours) {
                    this.mostActiveHour = '23';
                  }

                  if (data.messagesThisWeek[0] === resultDays) {
                    this.mostActiveDay = 'Monday';
                  } else if (data.messagesThisWeek[1] === resultDays) {
                    this.mostActiveDay = 'Tuesday';
                  } else if (data.messagesThisWeek[2] === resultDays) {
                    this.mostActiveDay = 'Wednesday';
                  } else if (data.messagesThisWeek[3] === resultDays) {
                    this.mostActiveDay = 'Thursday';
                  } else if (data.messagesThisWeek[4] === resultDays) {
                    this.mostActiveDay = 'Friday';
                  } else if (data.messagesThisWeek[5] === resultDays) {
                    this.mostActiveDay = 'Saturday';
                  } else if (data.messagesThisWeek[6] === resultDays) {
                    this.mostActiveDay = 'Sunday';
                  }

                  this.communityHours = new Chart('communityHours', {
                    type: 'bar',
                    data: {
                      labels: [
                        '00:00 GMT',
                        '01:00 GMT',
                        '02:00 GMT',
                        '03:00 GMT',
                        '04:00 GMT',
                        '05:00 GMT',
                        '06:00 GMT',
                        '07:00 GMT',
                        '08:00 GMT',
                        '09:00 GMT',
                        '10:00 GMT',
                        '11:00 GMT',
                        '12:00 GMT',
                        '13:00 GMT',
                        '14:00 GMT',
                        '15:00 GMT',
                        '16:00 GMT',
                        '17:00 GMT',
                        '18:00 GMT',
                        '19:00 GMT',
                        '20:00 GMT',
                        '21:00 GMT',
                        '22:00 GMT',
                        '23:00 GMT',
                      ],
                      datasets: [
                        {
                          data: [
                            data.hourBreakdown[0],
                            data.hourBreakdown[1],
                            data.hourBreakdown[2],
                            data.hourBreakdown[3],
                            data.hourBreakdown[4],
                            data.hourBreakdown[5],
                            data.hourBreakdown[6],
                            data.hourBreakdown[7],
                            data.hourBreakdown[8],
                            data.hourBreakdown[9],
                            data.hourBreakdown[10],
                            data.hourBreakdown[11],
                            data.hourBreakdown[12],
                            data.hourBreakdown[13],
                            data.hourBreakdown[14],
                            data.hourBreakdown[15],
                            data.hourBreakdown[16],
                            data.hourBreakdown[17],
                            data.hourBreakdown[18],
                            data.hourBreakdown[19],
                            data.hourBreakdown[20],
                            data.hourBreakdown[21],
                            data.hourBreakdown[22],
                            data.hourBreakdown[23],
                          ],
                          fill: false,
                          backgroundColor: '#8520f7',
                          borderColor: '#8520f7',
                          borderWidth: 3,
                          pointRadius: 3
                        }
                      ]
                    },
                    options: {
                      legend: {
                        display: false,
                        position: 'bottom'
                      },
                      title: {
                        text: 'Line Chart',
                        display: false
                      },
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              display: false,
                              beginAtZero: true
                            },
                            gridLines: {
                              zeroLineColor: 'transparent',
                              zeroLineWidth: 2,
                              drawTicks: false,
                              drawBorder: false,
                              color: 'transparent'
                            }
                          }
                        ],
                      }
                    }
                  });
                }
              }); // End of Http
            }
          });
      }
    });
  }

}
