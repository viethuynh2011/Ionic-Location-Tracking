import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';
import { RssPage } from '../../pages/rss/rss';
@IonicPage({
  name: 'FeedListPage'
})
@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: Boolean;
 
  constructor(private navCtrl: NavController, private iab: InAppBrowser, private feedProvider: FeedProvider, private navParams: NavParams) {
    this.selectedFeed = navParams.get('selectedFeed');
  }
 
  public openArticle(url: string) {
    this.iab.create(url, '_blank');
    // window.open(url, '_blank');
  }
 
  loadArticles() {
    this.loading = true;
    this.feedProvider.getArticlesForUrl(this.selectedFeed.url).subscribe(res => {
      console.log('res', res);
      this.articles = res;
      this.loading = false;
    });
  }
 
  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
      this.loadArticles()
    } else {
      this.feedProvider.getSavedFeeds().then(
        feeds => {
          if (feeds !== []) {
            let item = feeds[0];
            this.selectedFeed = new Feed(item.title, item.url);
            this.loadArticles();
          }
        }
      );
    }
  }
  async goBack() {
    this.navCtrl.setRoot(RssPage);
  }
}
