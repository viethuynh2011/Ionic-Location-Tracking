import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FeedProvider, Feed } from '../../providers/feed/feed';
import { FeedListPage } from '../../pages/feed-list/feed-list';
/**
 * Generated class for the RssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// declare var RSSParser;
@IonicPage()
@Component({
  selector: 'page-rss',
  templateUrl: 'rss.html',
})
export class RssPage {
  feeds: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private feedProvider: FeedProvider, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RssPage');
  }

  public addFeed() {
    let prompt = this.alertCtrl.create({
      title: 'Add Feed URL',
      inputs: [
        {
          name: 'name',
          placeholder: 'The best Feed ever'
        },
        {
          name: 'url',
          placeholder: 'http://www.myfeedurl.com/feed'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newFeed = new Feed(data.name, data.url);
            this.feedProvider.addFeed(newFeed);
            this.loadFeeds();
          }
        }
      ]
    });
    prompt.present();
  }

  private loadFeeds() {
    this.feedProvider.getSavedFeeds().then(allFeeds => {
      console.log('allFeeds', allFeeds);
      this.feeds = allFeeds;
    });
  }

  public openFeed(feed: Feed) {
    this.navCtrl.setRoot(FeedListPage, { 'selectedFeed': feed });
  }

  public ionViewWillEnter() {
    this.loadFeeds();
  }

}
