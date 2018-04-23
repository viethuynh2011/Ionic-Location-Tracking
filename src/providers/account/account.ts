import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { snapshotToArray, CommonDataProvider } from '../../providers/common-data/common-data';
import { Device } from '@ionic-native/device';
/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  email: string;
  password: string;
  bannerKey: string;
  interstitialKey: string;
  rewardVideoKey: string;
  roll: string
  isTesting: boolean
}

@Injectable()
export class AccountProvider {
  ref = firebase.database().ref('users');
  constructor(public http: HttpClient, private common: CommonDataProvider, private device: Device) {
    console.log('Hello AccountProvider Provider');
  }

  async login(user: User) {
    this.ref.on('value', resp => {
      let users = [];
      if (resp !== null) {
        users = snapshotToArray(resp);
        let check = users.find((x) => x.email == user.email && x.password === user.password);
        if (check !== undefined && check.roll === 'member') {
          this.common.setUser(check);
          return true;
        }
      }
    });
    return false;
  }

  async register(user: User) {
    this.ref.on('value', resp => {
      let users = [];
      if (resp !== null) {
        users = snapshotToArray(resp);
        let check = users.find((x) => x.email == user.email && x.password === user.password);
        if (check !== undefined) {
          return false;
        }
      }
    });
    return this.ref.push({
      uuid: this.device.uuid,
      email: user.email  || null,
      bannerKey: user.bannerKey || null,
      interstitialKey: user.interstitialKey || null,
      rewardVideoKey: user.rewardVideoKey || null,
      password: user.password || null,
      roll: 'new',
      isTesting: false
    });
  }
}
