import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export class User {
    email: string;
    password: string;
}


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams){
  }

  async register() {
   
  }
}
