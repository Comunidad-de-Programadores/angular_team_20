import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import 'firebase/auth'; 


@Injectable({ providedIn: 'root' })
export class LoginFacebook {
  constructor(
    public ngZone: NgZone,
    public router: Router,
    public afs: AngularFirestore, 
    protected afAuth: AngularFireAuth) {}

  handle() {
    return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(this.success.bind(this))
      .catch(this.error.bind(this));
  }

  protected success(result: any) {
    this.ngZone.run(() => {
      console.log('result', result);
    })
  }

  protected error(error: any) {
    window.alert(error)
  }
}