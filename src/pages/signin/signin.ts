import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
// import { WelcomePage } from '../welcome/welcome';
// import * as firebase from 'Firebase';
// import { AuthenticationProvider } from '../../providers/authentication/authentication';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  data = { email:"", password: "" };
  users = [];
  error = null;
  // ref = firebase.database().ref('users');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  // login() {
  //   this.error = null;
  //   // console.log('this.data.email',this.data.email);
  //   if ( this.data.email === null || this.data.email.trim() === '' ) {
  //     this.error = 'email not null. Please check again !';
  //     return;
  //   }
  //   if (this.data.password === null  || this.data.password.trim() === '') {
  //     this.error = 'Password not null. Please check again !';
  //     return;
  //   }
  //   this.auth.login(this.data)
  //   .then(response => {
  //       this.navCtrl.setRoot(WelcomePage);
  //   })
  //   .catch(error => {
  //       // handle error by showing alert
  //   })

    // this.ref.on('value', resp => {
    //   this.users = [];
    //   if  (resp !== null) {
    //     this.users = snapshotToArray(resp);
    //     let check = this.users.find((x) => x.email == this.data.email && x.password === this.data.password);
    //     // console.log('check', check);
    //     if (check === undefined) {
    //       this.error = 'email or password is failse. Please check again !';
    //       return;
    //     } else {
    //       this.navCtrl.setRoot(WelcomePage, {
    //         email: this.data.email
    //       });
    //     }
    //   } else {
    //     this.error = 'email or password is failse. Please check again !';
    //     return;
    //   }
    // });
  // }

  // createNewUser() {
  //   let newData = this.ref.push();
  //   newData.set({
  //     email: this.data.email,
  //     password: this.data.password
  //   });
  // }
}

// export const snapshotToArray = snapshot => {
//   let returnArr = [];

//   snapshot.forEach(childSnapshot => {
//       let item = childSnapshot.val();
//       item.key = childSnapshot.key;
//       returnArr.push(item);
//   });

//   return returnArr;
// };
