import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../auth/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  constructor(
    private service: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  loading = true;

  groupId: string;
  clientuserName: string;

  clientUserId: number;

  sessionTimes: any;
  sessionDays: any;
  inactiveDays: any;
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

  inactiveDaysOff: number;
  today = new Date();

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

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
    });
    this.route.params.subscribe(params => {
      this.groupId = params.id;
      this.clientuserName = params.userId;

      this.http
        .get<any>(
          `https://api.campfirebot.xyz/presence/search/${this.groupId}/${this.clientuserName}`,
          {
            headers: {
              Authorization: localStorage.getItem('auth')
            }
          }
        )
        .subscribe(data => {
          if (data.success === true) {
            console.log(data);
            this.loading = false;

            this.clientUserId = data.userId;

            this.loading = false;
            this.inactiveType = data.group.maxInactiveTypeYear;

            this.tokens = data.userData.tokens;
            this.warnings = data.userData.warnings;
            this.attended = data.userData.sessionsAttendedTotal;
            this.activity = 3 - data.userData.activityDeduct;
            this.warningsAllowed = data.group.maxWarnings;

            if (data.userData.warnings === 1) {
              this.warning1 = data.userData.warning1;
              this.momentWarning1 = moment(
                data.userData.warning1.time._seconds,
                'X'
              ).fromNow();
            } else if (data.userData.warnings === 2) {
              this.warning1 = data.userData.warning1;
              this.warning2 = data.userData.warning2;
              this.momentWarning1 = moment(
                data.userData.warning1.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning2 = moment(
                data.userData.warning2.time._seconds,
                'X'
              ).fromNow();
            } else if (data.userData.warnings === 3) {
              this.warning1 = data.userData.warning1;
              this.warning2 = data.userData.warning2;
              this.warning3 = data.userData.warning3;
              this.momentWarning1 = moment(
                data.userData.warning1.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning2 = moment(
                data.userData.warning2.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning3 = moment(
                data.userData.warning3.time._seconds,
                'X'
              ).fromNow();
            } else if (data.userData.warnings === 4) {
              this.warning1 = data.userData.warning1;
              this.warning2 = data.userData.warning2;
              this.warning3 = data.userData.warning3;
              this.warning4 = data.userData.warning4;
              this.momentWarning1 = moment(
                data.userData.warning1.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning2 = moment(
                data.userData.warning2.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning3 = moment(
                data.userData.warning3.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning4 = moment(
                data.userData.warning4.time._seconds,
                'X'
              ).fromNow();
            } else if (data.userData.warnings === 5) {
              this.warning1 = data.userData.warning1;
              this.warning2 = data.userData.warning2;
              this.warning3 = data.userData.warning3;
              this.warning4 = data.userData.warning4;
              this.warning5 = data.userData.warning5;
              this.momentWarning1 = moment(
                data.userData.warning1.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning2 = moment(
                data.userData.warning2.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning3 = moment(
                data.userData.warning3.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning4 = moment(
                data.userData.warning4.time._seconds,
                'X'
              ).fromNow();
              this.momentWarning5 = moment(
                data.userData.warning5.time._seconds,
                'X'
              ).fromNow();
            }

            this.tokensForPromos = data.group.tokensForPromotions;
            this.magicTokens = data.group.tokenAI;

            this.messageOnTokens = data.group.messageOnTokens;

            this.transactionLog = data.userData.transactions;

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
                      data.userData.sessionsAttended[0],
                      data.userData.sessionsAttended[1],
                      data.userData.sessionsAttended[2],
                      data.userData.sessionsAttended[3],
                      data.userData.sessionsAttended[4],
                      data.userData.sessionsAttended[5],
                      data.userData.sessionsAttended[6],
                      data.userData.sessionsAttended[7],
                      data.userData.sessionsAttended[8],
                      data.userData.sessionsAttended[9],
                      data.userData.sessionsAttended[10],
                      data.userData.sessionsAttended[11],
                      data.userData.sessionsAttended[12],
                      data.userData.sessionsAttended[13],
                      data.userData.sessionsAttended[14],
                      data.userData.sessionsAttended[15],
                      data.userData.sessionsAttended[16],
                      data.userData.sessionsAttended[17],
                      data.userData.sessionsAttended[18],
                      data.userData.sessionsAttended[19],
                      data.userData.sessionsAttended[20],
                      data.userData.sessionsAttended[21],
                      data.userData.sessionsAttended[22],
                      data.userData.sessionsAttended[23],
                      data.userData.sessionsAttended[24]
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

            const SessionTypeLabels = [];
            Object.keys(data.group.sessionTypesLabels).forEach(key => {
              SessionTypeLabels.push(data.group.sessionTypesLabels[key]);
            });

            const SessionTypeData = [];
            Object.keys(data.userData.session_types).forEach(key => {
              SessionTypeData.push(data.userData.session_types[key]);
            });

            this.sessionTimes = new Chart('sessionTypes', {
              type: 'doughnut',
              data: {
                labels: SessionTypeLabels,
                datasets: [
                  {
                    label: 'Number attended lifetime',
                    data: SessionTypeData,
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
                      data.userData.daysAttended.monday,
                      data.userData.daysAttended.tuesday,
                      data.userData.daysAttended.wednesday,
                      data.userData.daysAttended.thursday,
                      data.userData.daysAttended.friday,
                      data.userData.daysAttended.saturday,
                      data.userData.daysAttended.sunday
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

            if (data.group.maxInactiveTypeYear === 'month') {
              if (
                data.userData[
                  `inactivity_${this.today.getMonth()}_${this.today.getFullYear()}`
                ] !== 'undefined'
              ) {
                this.inactiveDaysOff =
                  data.userData[
                    `inactivity_${this.today.getMonth()}_${this.today.getFullYear()}`
                  ];
              } else {
                this.inactiveDaysOff = 0;
              }
            } else {
              if (
                data.userData[`inactivity_${this.today.getFullYear()}`] !==
                'undefined'
              ) {
                this.inactiveDaysOff = 0;
              } else {
                this.inactiveDaysOff =
                  data.userData[`inactivity_${this.today.getFullYear()}`];
              }
            }

            this.inactiveDays = new Chart('inactivity', {
              type: 'pie',
              data: {
                labels: ['Inactive', 'Inactive Remaining'],
                datasets: [
                  {
                    data: [this.inactiveDaysOff, data.group.maxInactiveDays],
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
                      data.group.staffPerformanceLastWeek.monday,
                      data.group.staffPerformanceLastWeek.tuesday,
                      data.group.staffPerformanceLastWeek.wednesday,
                      data.group.staffPerformanceLastWeek.thursday,
                      data.group.staffPerformanceLastWeek.friday,
                      data.group.staffPerformanceLastWeek.saturday,
                      data.group.staffPerformanceLastWeek.sunday
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
                      data.group.staffPerformanceThisWeek.monday,
                      data.group.staffPerformanceThisWeek.tuesday,
                      data.group.staffPerformanceThisWeek.wednesday,
                      data.group.staffPerformanceThisWeek.thursday,
                      data.group.staffPerformanceThisWeek.friday,
                      data.group.staffPerformanceThisWeek.saturday,
                      data.group.staffPerformanceThisWeek.sunday
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

            if (data.userData.weekly !== undefined) {
              this.tokensWeek = data.userData.weekly.tokens;
              this.sessionsWeek = data.userData.weekly.sessionsAttended;
            } else {
              this.tokensWeek = 0;
              this.sessionsWeek = 0;
            }
          } else {
            this.router.navigate(['/']);
            Swal.fire({
              title: 'Whoops!',
              type: 'error',
              text: data.reason
            });
          }
        });
    });
  }

  addAttendance() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/activity/add/${this.clientUserId}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.activity = this.activity + 0.5;
        }
      });
  }

  removeAttendance() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/activity/minus/${this.clientUserId}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.activity = this.activity - 0.5;
        }
      });
  }

  resetAttendance() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/activity/reset/${this.clientUserId}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.activity = 3;
        }
      });
  }

  // Tokens Changer

  addTokens() {
    const amountToAdd = (document.getElementById(
      'tokenAmount'
    ) as HTMLInputElement).value;
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/tokens/add/${this.clientUserId}/${amountToAdd}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
          this.tokens = this.tokens + parseFloat(amountToAdd);
        }
      });
  }

  removeTokens() {
    const amountToRemove = (document.getElementById(
      'tokenAmount'
    ) as HTMLInputElement).value;
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/tokens/remove/${this.clientUserId}/${amountToRemove}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
          this.tokens = this.tokens - parseFloat(amountToRemove);
        }
      });
  }

  setTokens() {
    const amountToSet = (document.getElementById(
      'tokenAmount'
    ) as HTMLInputElement).value;
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/tokens/set/${this.clientUserId}/${amountToSet}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
          this.tokens = parseFloat(amountToSet);
        }
      });
  }

  resetTokens() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/tokens/reset/${this.clientUserId}/${this.inactiveType}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.tokens = 0;
        }
      });
  }

  addInactivity() {
    const amountToAdd = (document.getElementById(
      'daysOffAmount'
    ) as HTMLInputElement).value;
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/inactivity/add/${this.clientUserId}/${amountToAdd}/${this.inactiveType}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
          this.inactiveDaysOff = this.inactiveDaysOff + parseFloat(amountToAdd);
        }
      });
  }

  removeInactivity() {
    const amountToRemove = (document.getElementById(
      'daysOffAmount'
    ) as HTMLInputElement).value;
    this.http
      .get<any>(
        // tslint:disable-next-line: max-line-length
        `https://api.campfirebot.xyz/presence/${this.groupId}/inactivity/remove/${this.clientUserId}/${amountToRemove}/${this.inactiveType}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
          this.inactiveDaysOff =
            this.inactiveDaysOff - parseFloat(amountToRemove);
        }
      });
  }

  setInactivity() {
    const amountToSet = (document.getElementById(
      'daysOffAmount'
    ) as HTMLInputElement).value;
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/inactivity/set/${this.clientUserId}/${amountToSet}/${this.inactiveType}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
          this.inactiveDaysOff = parseFloat(amountToSet);
        }
      });
  }

  resetInactivity() {
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/${this.groupId}/inactivity/reset/${this.clientUserId}/${this.inactiveType}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(callback => {
        if (callback.success === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.inactiveDaysOff = 0;
        }
      });
  }

  destroy() {
    Swal.fire({
      title: 'This feature is coming soon',
      // tslint:disable-next-line: quotemark
      text: "Apologies. We're working on it!",
      type: 'info',
      showConfirmButton: false,
      timer: 5000
    });
  }
}
