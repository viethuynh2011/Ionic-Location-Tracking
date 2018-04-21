import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { Device } from '@ionic-native/device';
import { LoginPage } from '../../pages/login/login';
import { User, snapshotToArray } from '../../providers/common-data/common-data';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: User;
  ref = firebase.database().ref('users');
  error = null;
  users = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device) {
    this.user = new User();
  }

  async register() {
    console.log(this.user);
    this.error = null;
    if ( (this.user.email || null) === null || this.user.email === '') {
      this.error = 'Email not null. Please check again !';
      return;
    }
    if ( (this.user.password || null) === null || this.user.password === '') {
      this.error = 'Password not null. Please check again !';
      return;
    }
    this.ref.on('value', resp => {
      this.users = [];
      if (resp !== null) {
        this.users = snapshotToArray(resp);
        let check = this.users.find((x) => x.email == this.user.email && x.password === this.user.password);
        if (check !== undefined) {
          this.error = 'Email or password is failse. Please check again !';
          return;
        }
      }
    });
    let newData = this.ref.push();
    newData.set({
      uuid: this.device.uuid,
      email: this.user.email  || null,
      bannerKey: this.user.bannerKey || null,
      interstitialKey: this.user.interstitialKey || null,
      rewardVideoKey: this.user.rewardVideoKey || null,
      password: this.user.password || null,
      roll: 'new',
      isTesting: false
    });
    localStorage.setItem('mykey', newData.key);
    this.navCtrl.setRoot(LoginPage);
  }

  async goBack() {
    this.navCtrl.setRoot(LoginPage);
  }
}
