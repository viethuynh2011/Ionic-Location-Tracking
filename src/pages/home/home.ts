import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { User, CommonDataProvider } from '../../providers/common-data/common-data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user:User = new User();
  constructor(public navCtrl: NavController, private adMobFree: AdMobFree, private common: CommonDataProvider){
    this.user = this.common.getUser();
    console.log('user', this.user);
    this.showBannerAd();
  }

  async showBannerAd() {
    try {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: this.user.bannerKey,
        isTesting: true,
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
        isTesting: true,
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
}
