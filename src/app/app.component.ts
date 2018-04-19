import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
const config = {
  apiKey: "AIzaSyDDmGApf_jji3X8B-2FXsqxlOynvAVAM4A",
  authDomain: "locationtracking-92cca.firebaseapp.com",
  databaseURL: "https://locationtracking-92cca.firebaseio.com",
  projectId: "locationtracking-92cca",
  storageBucket: "locationtracking-92cca.appspot.com",
  messagingSenderId: "391886369785"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  appMenuItems: Array<MenuItem>;
  accountMenuItems: Array<MenuItem>;
  helpMenuItems: Array<MenuItem>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.appMenuItems = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Map', component: MapPage, icon: 'map'},
      { title: 'Brokers', component: WelcomePage, icon: 'people'},
      { title: 'Favorites', component: WelcomePage, icon: 'star'},
      { title: 'Get Preapproved', component: WelcomePage, icon: 'checkmark-circle' },
    ];

    this.accountMenuItems = [
      { title: 'My Account', component: WelcomePage, icon: 'ios-contact' },
      { title: 'Logout', component: LoginPage, icon: 'log-out' },
    ];

    this.helpMenuItems = [
      { title: 'Welcome', component: WelcomePage, icon: 'bookmark' },
      { title: 'About', component: AboutPage, icon: 'information-circle' },
    ];
    firebase.initializeApp(config);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
