import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RssPage } from '../pages/rss/rss';
import { FeedListPage } from '../pages/feed-list/feed-list';
import { Device } from '@ionic-native/device';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AdMobFree } from '@ionic-native/admob-free';
import { CommonDataProvider } from '../providers/common-data/common-data';
import { FeedProvider } from '../providers/feed/feed';
import { AccountProvider } from '../providers/account/account';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    AboutPage,
    MapPage,
    LoginPage,
    RegisterPage,
    RssPage,
    FeedListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    AboutPage,
    MapPage,
    LoginPage,
    RegisterPage,
    RssPage,
    FeedListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Device,
    Diagnostic,
    AdMobFree,
    CommonDataProvider,
    InAppBrowser,
    FeedProvider,
    AccountProvider
  ],
})
export class AppModule {}
