import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-marabou',
  templateUrl: './marabou.component.html',
  styleUrls: ['./marabou.component.css']
})
export class MarabouComponent implements OnInit {
  user: firebase.User;
  avatar: string;
  name: string;
  balance: number;
  robloxId: number;
  warnings: any = 'Loading...';
  attendance: any = 'Loading...';
  maraScore: any = 'Loading...';
  warning1Time: any;
  warning2Time: any;
  warning1Issuer: string;
  warning2Issuer: string;
  warning1Reason: string;
  warning2Reason: string;

  cta = false;
  text: string;
  STtoMT: number;
  MTtoAT: number;

  constructor(
    private service: LoginService,
    private router: Router,
    private db: AngularFirestore,
    private http: HttpClient
  ) {}

  sessionTimes: any;
  sessionDays: any;
  inactiveDays: any;

  ngOnInit() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.db
      .collection('open')
      .doc('cta')
      .ref.onSnapshot(doc => {
        if (doc.exists) {
          this.cta = doc.data().visible;
          this.text = doc.data().value;
        }
      });

    this.service.getLoggedInUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
      this.user = user;
      if (user) {
        this.db
          .collection('users')
          .doc(localStorage.getItem('id'))
          .ref.onSnapshot(doc => {
            if (doc.exists) {
              if (doc.data().maraSecure === 'S8UfH') {
                if (doc.data().robloxId === undefined) {
                  this.router.navigate(['/']);
                } else {
                  const robloxId = doc.data().robloxId;
                  this.robloxId = doc.data().robloxId;
                  this.http
                    .get<any>(
                      `https://api.campfirebot.xyz/roblox/username/${robloxId}`
                    )
                    .subscribe(data => {
                      const parsed = JSON.parse(data);
                      this.name = parsed.Username;
                    });

                  this.http
                    .get<any>(
                      `https://api.campfirebot.xyz/marabou/tokens/${this.robloxId}`
                    )
                    .subscribe(data => {
                      this.balance = data.balance;
                      this.sessionTimes = new Chart('sessionTimes', {
                        type: 'doughnut',
                        data: {
                          labels: [
                            '13:00 BST',
                            '15:00 BST',
                            '17:00 BST',
                            '19:00 BST',
                            '21:00 BST',
                            '23:00 BST'
                          ],
                          datasets: [
                            {
                              label: 'Number attended lifetime',
                              data: [
                                data.sessions_attended[13],
                                data.sessions_attended[15],
                                data.sessions_attended[17],
                                data.sessions_attended[19],
                                data.sessions_attended[21],
                                data.sessions_attended[23]
                              ],
                              fill: false,
                              lineTension: 0.1,
                              backgroundColor: [
                                '#e8b325',
                                '#e86025',
                                '#e83925',
                                '#e82569',
                                '#9325e8',
                                '#25e8ba'
                              ],
                              borderWidth: 3,
                              pointRadius: 0
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

                      this.sessionDays = new Chart('sessionDays', {
                        type: 'doughnut',
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
                              label: 'Number attended lifetime',
                              data: [
                                data.days_attended.monday,
                                data.days_attended.tuesday,
                                data.days_attended.wednesday,
                                data.days_attended.thursday,
                                data.days_attended.friday,
                                data.days_attended.saturday,
                                data.days_attended.sunday
                              ],
                              fill: false,
                              lineTension: 0.1,
                              backgroundColor: [
                                '#e8b325',
                                '#e86025',
                                '#e83925',
                                '#e82569',
                                '#9325e8',
                                '#25e8ba',
                                '#e8253c'
                              ],
                              borderWidth: 3,
                              pointRadius: 0
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

                      this.inactiveDays = new Chart('inactiveDays', {
                        type: 'doughnut',
                        data: {
                          labels: ['Inactive', 'Remaining inactive days'],
                          datasets: [
                            {
                              label: 'Number attended lifetime',
                              data: [
                                data.inactive_days,
                                50 - data.inactive_days
                              ],
                              fill: false,
                              lineTension: 0.1,
                              backgroundColor: ['#e82525', '#25e85c'],
                              borderWidth: 3,
                              pointRadius: 0
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

                      this.warnings = data.warnings;
                      this.attendance = data.attendance;

                      this.maraScore = (data.warnings + data.attendance) / 2;
                      this.warning1Time = moment(
                        data.warning_info.warning_1.time,
                        'X'
                      ).fromNow();

                      this.warning1Issuer = data.warning_info.warning_1.issuer;
                      this.warning1Reason = data.warning_info.warning_1.reason;

                      this.warning2Time = moment(
                        data.warning_info.warning_2.time,
                        'X'
                      ).fromNow();
                      this.warning2Issuer = data.warning_info.warning_2.issuer;
                      this.warning2Reason = data.warning_info.warning_2.reason;
                    });

                  this.db
                    .collection('open')
                    .doc('tokens')
                    .ref.onSnapshot(tokenSystem => {
                      if (tokenSystem.exists) {
                        const difficultyMT = tokenSystem.data().difficultyMT;
                        const difficultyAT = tokenSystem.data().difficultyAT;

                        this.http
                          .get<any>('https://api.campfirebot.xyz/marabou/group')
                          .subscribe(data => {
                            const parsed = JSON.parse(data);
                            const memberCountMT = parsed.roles[9].memberCount;
                            const memberCountAT = parsed.roles[10].memberCount;
                            const baseMT = 4 * difficultyMT;
                            const baseAT = 4 * difficultyAT;

                            this.STtoMT = Math.floor(
                              (baseMT * memberCountMT) / 1.2
                            );
                            this.MTtoAT = Math.floor(
                              (baseAT * memberCountAT) / 1.2
                            );

                            if (this.STtoMT === 0) {
                              this.STtoMT = 4;
                            }

                            if (this.MTtoAT === 0) {
                              this.MTtoAT = 4;
                            }
                          });
                      }
                    });
                }
              } else {
                this.router.navigate(['/']);
                setTimeout(() => {
                  window.alert('Your Campfire account is not MaraSecured');
                }, 2000);
              }
            }
          });
      }
    });
  }
}
