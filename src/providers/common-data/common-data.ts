import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
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
  rewardVideoKey: string;
  roll: string
  isTesting: boolean
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

  constructor(public http: HttpClient, private adMobFree: AdMobFree) {
    console.log('Hello CommonDataProvider Provider');
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  async showBannerAd() {
    try {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: this.user.bannerKey,
        isTesting: this.user.isTesting,
        autoShow: true
      }
      this.adMobFree.banner.config(bannerConfig);
      const result = await this.adMobFree.banner.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }

  async showInterstitialAd() {
    try {
      const interstitialConfig: AdMobFreeInterstitialConfig = {
        id: this.user.interstitialKey,
        isTesting: this.user.isTesting,
        autoShow: true
      }

      this.adMobFree.interstitial.config(interstitialConfig);

      const result = await this.adMobFree.interstitial.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e)
    }
  }

  async showVideoRewardsAd() {
    try {
      const videoRewardsConfig: AdMobFreeRewardVideoConfig = {
        id: this.user.rewardVideoKey,
        isTesting: this.user.isTesting,
        autoShow: true
      }

      this.adMobFree.rewardVideo.config(videoRewardsConfig);

      const result = await this.adMobFree.rewardVideo.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }

}
