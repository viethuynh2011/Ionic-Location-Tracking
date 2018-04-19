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
  public user:User = new User();
  constructor(public navCtrl: NavController, public navParams: NavParams, private common: CommonDataProvider){
  }

  async login() {
     this.ref.on('value', resp => {
      this.users = [];
      if  (resp !== null) {
        this.users = snapshotToArray(resp);
        let check = this.users.find((x) => x.email == this.user.email && x.password === this.user.password);
        if (check === undefined) {
          this.error = 'email or password is failse. Please check again !';
          return;
        } else {
          this.common.setUser(check);
          this.navCtrl.setRoot(HomePage);
        }
      } else {
        this.error = 'email or password is failse. Please check again !';
        return;
      }
  });
}

  async register() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
