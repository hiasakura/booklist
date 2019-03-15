import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  public FBTOKEN = '';
  public FBUUID = '';
  EMAIL = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX@gmail.com';
  PASSWORD = 'hogehogehogehoge'

  constructor() {
    const config = {
      apiKey: 'AIzaSyAIvHZtzbQH_nXUJ1boxbxL14IOPuRHo9c',
      authDomain: 'angular-guide-firebase.firebaseapp.com',
      databaseURL: 'https://angular-guide-firebase.firebaseio.com',
      projectId: 'angular-guide-firebase',
      storageBucket: 'angular-guide-firebase.appspot.com',
      messagingSenderId: '582123911754',
    };
    firebase.initializeApp(config);
    this.signInOrCreateUser(this.EMAIL, this.PASSWORD);
  }

  signInOrCreateUser(email, password): void {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      console.log(userCredential.user.uid);
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        console.log(token);
        this.FBTOKEN = token;
        this.FBUUID = userCredential.user.uid;
      });
    }).catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          console.log(token);
          this.FBTOKEN = token;
          this.FBUUID = userCredential.user.uid;
        });
      });
    });
  } 
}