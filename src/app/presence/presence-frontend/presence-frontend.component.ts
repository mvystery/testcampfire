import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presence-frontend',
  templateUrl: './presence-frontend.component.html',
  styleUrls: ['./presence-frontend.component.css']
})
export class PresenceFrontendComponent implements OnInit {
  constructor(
    private service: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  loading = true;

  id: number;
  greeting: string;
  robloxUsername: string;
  groupName: string;
  cta: string;
  ctaVisible: boolean;

  sessionTimes: any;
  sessionDays: any;
  inactiveDays: any;
  sessionTypes: any;
  staffPerformance: any;

  tokens: number;
  warnings: number;
  attended: number;
  activity: number;
  warningsAllowed: number;
  magicTokens: boolean;
  tokensForPromos: boolean;
  messageOnTokens: string;
  transactionLog: Array<string>;
  inactiveType: string;

  sessionsWeek: number;
  tokensWeek: number;

  warning1: object;
  warning2: object;
  warning3: object;
  warning4: object;
  warning5: object;

  momentWarning1: any;
  momentWarning2: string;
  momentWarning3: string;
  momentWarning4: string;
  momentWarning5: string;

  isMod: boolean;

  inactiveDaysOff: number;
  today = new Date();

  discordLink: string;
  handbookLink: string;

  ngOnInit() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    const timeNow = new Date().getHours();
    if (timeNow < 12) {
      this.greeting = 'Good morning';
    }

    if (timeNow >= 12) {
      this.greeting = 'Good afternoon';
    }

    if (timeNow >= 17) {
      this.greeting = 'Good evening';
    }

    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/checkmod/${this.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        if (data.allowed === false) {
          this.router.navigate(['/']);
          Swal.fire({
            title: 'Whoops!',
            type: 'error',
            text: 'Not authenticated properly'
          });
        } else {
          this.isMod = true;
        }
      });

    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/data/${this.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        if (data.presence.exists === true) {
          this.loading = false;
          this.groupName = data.presence.group.groupName;
          this.cta = data.presence.group.cta;
          this.ctaVisible = data.presence.group.ctaShowing;

          this.inactiveType = data.presence.group.maxInactiveTypeYear;

          this.tokens = data.presence.user.tokens;
          this.warnings = data.presence.user.warnings;
          this.attended = data.presence.user.sessionsAttendedTotal;
          this.activity = 3 - data.presence.user.activityDeduct;
          this.warningsAllowed = data.presence.group.maxWarnings;

          this.discordLink = data.presence.group.discordLink;
          this.handbookLink = data.presence.group.handbook;

          if (data.presence.user.warnings === 1) {
            this.warning1 = data.presence.user.warning1;
            this.momentWarning1 = moment(
              data.presence.user.warning1.time._seconds,
              'X'
            ).fromNow();
          } else if (data.presence.user.warnings === 2) {
            this.warning1 = data.presence.user.warning1;
            this.warning2 = data.presence.user.warning2;
            this.momentWarning1 = moment(
              data.presence.user.warning1.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning2 = moment(
              data.presence.user.warning2.time._seconds,
              'X'
            ).fromNow();
          } else if (data.presence.user.warnings === 3) {
            this.warning1 = data.presence.user.warning1;
            this.warning2 = data.presence.user.warning2;
            this.warning3 = data.presence.user.warning3;
            this.momentWarning1 = moment(
              data.presence.user.warning1.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning2 = moment(
              data.presence.user.warning2.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning3 = moment(
              data.presence.user.warning3.time._seconds,
              'X'
            ).fromNow();
          } else if (data.presence.user.warnings === 4) {
            this.warning1 = data.presence.user.warning1;
            this.warning2 = data.presence.user.warning2;
            this.warning3 = data.presence.user.warning3;
            this.warning4 = data.presence.user.warning4;
            this.momentWarning1 = moment(
              data.presence.user.warning1.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning2 = moment(
              data.presence.user.warning2.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning3 = moment(
              data.presence.user.warning3.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning4 = moment(
              data.presence.user.warning4.time._seconds,
              'X'
            ).fromNow();
          } else if (data.presence.user.warnings === 5) {
            this.warning1 = data.presence.user.warning1;
            this.warning2 = data.presence.user.warning2;
            this.warning3 = data.presence.user.warning3;
            this.warning4 = data.presence.user.warning4;
            this.warning5 = data.presence.user.warning5;
            this.momentWarning1 = moment(
              data.presence.user.warning1.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning2 = moment(
              data.presence.user.warning2.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning3 = moment(
              data.presence.user.warning3.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning4 = moment(
              data.presence.user.warning4.time._seconds,
              'X'
            ).fromNow();
            this.momentWarning5 = moment(
              data.presence.user.warning5.time._seconds,
              'X'
            ).fromNow();
          }

          this.tokensForPromos = data.presence.group.tokensForPromotions;
          this.magicTokens = data.presence.group.tokenAI;

          this.messageOnTokens = data.presence.group.messageOnTokens;

          this.transactionLog = data.presence.user.transactions;

          this.sessionTimes = new Chart('sessionTimes', {
            type: 'doughnut',
            data: {
              labels: [
                '00:00',
                '01:00',
                '02:00',
                '03:00',
                '04:00',
                '05:00',
                '06:00',
                '07:00',
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00',
                '24:00'
              ],
              datasets: [
                {
                  label: 'Number attended lifetime',
                  data: [
                    data.presence.user.sessionsAttended[0],
                    data.presence.user.sessionsAttended[1],
                    data.presence.user.sessionsAttended[2],
                    data.presence.user.sessionsAttended[3],
                    data.presence.user.sessionsAttended[4],
                    data.presence.user.sessionsAttended[5],
                    data.presence.user.sessionsAttended[6],
                    data.presence.user.sessionsAttended[7],
                    data.presence.user.sessionsAttended[8],
                    data.presence.user.sessionsAttended[9],
                    data.presence.user.sessionsAttended[10],
                    data.presence.user.sessionsAttended[11],
                    data.presence.user.sessionsAttended[12],
                    data.presence.user.sessionsAttended[13],
                    data.presence.user.sessionsAttended[14],
                    data.presence.user.sessionsAttended[15],
                    data.presence.user.sessionsAttended[16],
                    data.presence.user.sessionsAttended[17],
                    data.presence.user.sessionsAttended[18],
                    data.presence.user.sessionsAttended[19],
                    data.presence.user.sessionsAttended[20],
                    data.presence.user.sessionsAttended[21],
                    data.presence.user.sessionsAttended[22],
                    data.presence.user.sessionsAttended[23],
                    data.presence.user.sessionsAttended[24]
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
                    '#255fe8',
                    '#e8e225',
                    '#e86325',
                    '#252ce8',
                    '#e8b325',
                    '#e86025',
                    '#e83925',
                    '#e82569',
                    '#9325e8',
                    '#25e8ba',
                    '#255fe8',
                    '#e8e225',
                    '#e86325',
                    '#252ce8',
                    '#e8b325',
                    '#e86025',
                    '#e83925',
                    '#e82569',
                    '#9325e8'
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

          this.sessionTypes = new Chart('sessionTypes', {
            type: 'doughnut',
            data: {
              labels: ['Interview', 'Training', 'Shift'],
              datasets: [
                {
                  label: 'Number attended lifetime',
                  data: [
                    data.presence.user.session_types.interview,
                    data.presence.user.session_types.training,
                    data.presence.user.session_types.shift
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
                    '#255fe8',
                    '#e8e225',
                    '#e86325',
                    '#252ce8'
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

          this.sessionTimes = new Chart('sessionDays', {
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
                    data.presence.user.daysAttended.monday,
                    data.presence.user.daysAttended.tuesday,
                    data.presence.user.daysAttended.wednesday,
                    data.presence.user.daysAttended.thursday,
                    data.presence.user.daysAttended.friday,
                    data.presence.user.daysAttended.saturday,
                    data.presence.user.daysAttended.sunday
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
                    '#255fe8',
                    '#e8e225',
                    '#e86325',
                    '#252ce8'
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

          if (data.presence.group.maxInactiveTypeYear === 'month') {
            if (
              data.presence.user[
                `inactivity_${this.today.getMonth()}_${this.today.getFullYear()}`
              ] !== undefined
            ) {
              this.inactiveDaysOff =
                data.presence.user[
                  `inactivity_${this.today.getMonth()}_${this.today.getFullYear()}`
                ];
            } else {
              this.inactiveDaysOff = 0;
            }
          } else {
            if (
              data.presence.user[`inactivity_${this.today.getFullYear()}`] !==
              undefined
            ) {
              this.inactiveDaysOff =
                data.user[`inactivity_${this.today.getFullYear()}`];
            } else {
              this.inactiveDaysOff = 0;
            }
          }

          this.inactiveDays = new Chart('inactivity', {
            type: 'pie',
            data: {
              labels: ['Inactive', 'Inactive Remaining'],
              datasets: [
                {
                  data: [
                    this.inactiveDaysOff,
                    data.presence.group.maxInactiveDays
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

          this.staffPerformance = new Chart('staffPerformance', {
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
                  label: 'Last week',
                  data: [
                    data.presence.group.staffPerformanceLastWeek.monday,
                    data.presence.group.staffPerformanceLastWeek.tuesday,
                    data.presence.group.staffPerformanceLastWeek.wednesday,
                    data.presence.group.staffPerformanceLastWeek.thursday,
                    data.presence.group.staffPerformanceLastWeek.friday,
                    data.presence.group.staffPerformanceLastWeek.saturday,
                    data.presence.group.staffPerformanceLastWeek.sunday
                  ],
                  fill: false,
                  lineTension: 0.3,
                  backgroundColor: '#ababab',
                  borderColor: '#ababab',
                  borderWidth: 3,
                  pointRadius: 3
                },
                {
                  label: 'This week',
                  data: [
                    data.presence.group.staffPerformanceThisWeek.monday,
                    data.presence.group.staffPerformanceThisWeek.tuesday,
                    data.presence.group.staffPerformanceThisWeek.wednesday,
                    data.presence.group.staffPerformanceThisWeek.thursday,
                    data.presence.group.staffPerformanceThisWeek.friday,
                    data.presence.group.staffPerformanceThisWeek.saturday,
                    data.presence.group.staffPerformanceThisWeek.sunday
                  ],
                  fill: false,
                  lineTension: 0.3,
                  backgroundColor: '#94cf48',
                  borderColor: '#94cf48',
                  borderWidth: 3,
                  pointRadius: 3
                }
              ]
            },
            options: {
              legend: {
                display: true,
                position: 'top'
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

          if (data.presence.user.weekly !== undefined) {
            this.tokensWeek = data.presence.user.weekly.tokens;
            this.sessionsWeek = data.presence.user.weekly.sessionsAttended;
          } else {
            this.tokensWeek = 0;
            this.sessionsWeek = 0;
          }
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: data.presence.reason
          });

          this.router.navigate(['/presence']);
        }
      });
  }
}
