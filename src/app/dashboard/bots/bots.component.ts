import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit {
  bots = []
  user: firebase.User;
  constructor(private db: AngularFirestore, private service: LoginService) { }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (user) {
        this.user = user;
        console.log(user.uid);
        this.db.collection('bots').ref.where('ownerId', '==', user.uid).get()
          .then(bots => {
            console.log(bots);
            bots.forEach(bot => {
              console.log(bot.id);
              this.bots.push({ id: bot.id, data: bot.data()})
            })
          }).catch(err => {
            console.error(err);
          })
      }
    })
  }

  manageBot(id) {
    console.log(id);
  }

}
