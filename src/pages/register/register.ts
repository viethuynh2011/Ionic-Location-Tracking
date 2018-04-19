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
  public user: User = new User();
  ref = firebase.database().ref('users');
  error = null;
  users = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device) {
  }

  async register() {
    this.ref.on('value', resp => {
      this.users = [];
      if (resp !== null) {
        this.users = snapshotToArray(resp);
        let check = this.users.find((x) => x.email == this.user.email && x.password === this.user.password);
        if (check !== undefined) {
          this.error = 'email or password is failse. Please check again !';
          return;
        }
      }
    });
    let newData = this.ref.push();
    newData.set({
      uuid: this.device.uuid,
      email: this.user.email,
      bannerKey: this.user.bannerKey,
      interstitialKey: this.user.interstitialKey,
      password: this.user.password,
    });
    localStorage.setItem('mykey', newData.key);
    this.navCtrl.setRoot(LoginPage);
  }
  async login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
