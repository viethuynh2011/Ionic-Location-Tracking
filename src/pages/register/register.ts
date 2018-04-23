import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { LoginPage } from '../../pages/login/login';
import { User, AccountProvider } from '../../providers/account/account';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private account: AccountProvider) {
    this.user = new User();
  }

  async register() {
    this.error = null;
    if ( (this.user.email || null) === null || this.user.email === '') {
      this.error = 'Email not null. Please check again !';
      return;
    }
    if ( (this.user.password || null) === null || this.user.password === '') {
      this.error = 'Password not null. Please check again !';
      return;
    }
    if(this.account.register(this.user)){
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.error = 'Server not response !';
      return;
    }
  }

  async goBack() {
    this.navCtrl.setRoot(LoginPage);
  }
}
