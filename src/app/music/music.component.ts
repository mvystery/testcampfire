import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit, AfterViewInit {
  lists = [];

  songAddModal: boolean;
  addSongToList: string;

  bg = '#1a1a1a'
  accent = '#e6c0c0'

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.db.collection('music').ref.get()
      .then(docs => {
        docs.forEach(doc => {
          console.log(doc.id);
          this.lists.push({ id: doc.id, name: doc.data().name, songs: doc.data().songs })
          console.log(this.lists);
        })
      })
    }, 500);
  }

  convertRGBToRGBString(rgb, opacity) {
    return(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`)
  }

  removeItem(container, song) {
    this.db.collection('music').doc(container).update({
      songs: firebase.firestore.FieldValue.arrayRemove(song)
    }).then(() => {
      this.lists = [];
      this.db.collection('music').ref.get()
      .then(docs => {
        docs.forEach(doc => {
          console.log(doc.id);
          this.lists.push({ id: doc.id, name: doc.data().name, songs: doc.data().songs })
          console.log(this.lists);
        })
      })
    })
  }

  openAddSong(container) {
    this.songAddModal = true;
    this.addSongToList = container;
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  addSong(data) {
    const accent = this.hexToRgb(this.accent);
    const bg = this.hexToRgb(this.bg);

    this.db.collection('music').doc(this.addSongToList).update({
      songs: firebase.firestore.FieldValue.arrayUnion({ name: data.value.name, artist: data.value.artist, accent: accent, bg: bg, id: data.value.id })
    }).then(() => {
      this.songAddModal = false;
      this.lists = [];
      this.db.collection('music').ref.get()
      .then(docs => {
        docs.forEach(doc => {
          console.log(doc.id);
          this.lists.push({ id: doc.id, name: doc.data().name, songs: doc.data().songs })
          console.log(this.lists);
        })
      })
    })
  }

}
