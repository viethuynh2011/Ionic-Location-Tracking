import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommonDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  email: string;
  password: string;
  bannerKey: string;
  interstitialKey: string;
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Injectable()
export class CommonDataProvider {
  public user:User = new User();
  constructor(public http: HttpClient) {
    console.log('Hello CommonDataProvider Provider');
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

}
