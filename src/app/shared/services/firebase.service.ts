import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  public FBTOKEN = '';
  public FBUUID = '';
  EMAIL = 'hiroastbeaf@gmail.com';
  PASSWORD = '$Lemon01'

  constructor() {
    console.log("FirebaseService initialization");
    const config = {
      apiKey: 'AIzaSyAIvHZtzbQH_nXUJ1boxbxL14IOPuRHo9c',
      authDomain: 'angular-guide-firebase.firebaseapp.com',
      databaseURL: 'https://angular-guide-firebase.firebaseio.com',
      projectId: 'angular-guide-firebase',
      storageBucket: 'angular-guide-firebase.appspot.com',
      messagingSenderId: '582123911754',
    };
    firebase.initializeApp(config);
    console.log("0");
    this.signInOrCreateUser(this.EMAIL, this.PASSWORD);
  }


  signInOrCreateUser(email, password): void {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      console.log(userCredential.user.uid);
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        console.log(token);
      });
    }).catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          console.log(token);
        });
      });
    });
  }
}