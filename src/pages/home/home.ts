import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonDataProvider } from '../../providers/common-data/common-data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private common: CommonDataProvider){
    this.common.showBannerAd();
    // this.common.startTheIterations();
  }
}
