import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';

export class User {
    email: string;
    password: string;
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams){
  }


  async login() {
    
  }

  async register() {
    this.navCtrl.setRoot('RegisterPage');
  }

}