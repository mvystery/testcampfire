import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { Chart } from 'chart.js';

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

  LineChart: any;

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
        window.alert('You must login!');
      }
      this.user = user;
      if (user) {
        this.db
          .collection('users')
          .doc(localStorage.getItem('id'))
          .ref.onSnapshot(doc => {
            if (doc.exists) {
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
                    this.LineChart = new Chart('lineChart', {
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
                          display: true,
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
                          const baseAT = 4 * difficultyMT;

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
            }
          });
      }
    });
  }
}
