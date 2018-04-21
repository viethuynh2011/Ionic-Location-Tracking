import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { User, snapshotToArray, CommonDataProvider } from '../../providers/common-data/common-data';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  ref = firebase.database().ref('users');
  error = null;
  users = [];
  user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private common: CommonDataProvider){
    this.user = new User();
    this.user.email = 'demo';
    this.user.password = '123456';
  }

  async login() {
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
      if  (resp !== null) {
        this.users = snapshotToArray(resp);
        let check = this.users.find((x) => x.email == this.user.email && x.password === this.user.password);
        if (check === undefined) {
          this.error = 'Email or password is failse. Please check again !';
          return;
        } else if (check.roll !== 'member') {
          this.error = 'You are not member!';
          return;
        } else {
          this.common.setUser(check);
          this.navCtrl.setRoot(HomePage);
        }
      } else {
        this.error = 'Email or password is failse. Please check again !';
        return;
      }
  });
}

  async register() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
