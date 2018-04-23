import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';
import { snapshotToArray } from '../common-data/common-data';
// import { Storage } from '@ionic/storage';
// import { Observable } from 'rxjs/Observable';
import * as firebase from 'Firebase';
export class FeedItem {
  description: string;
  link: string;
  title: string;

  constructor(description: string, link: string, title: string) {
    this.description = description;
    this.link = link;
    this.title = title;
  }
}

export class Feed {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

@Injectable()
export class FeedProvider {
  ref = firebase.database().ref('feeds');
  constructor(private http: Http, private device: Device) { }

  getSavedFeeds() {
    return new Promise(resolve => {
      this.ref.on('value', resp => {
        console.log('resp', resp);
        if (resp !== null) {
          console.log('getSavedFeeds', snapshotToArray(resp));
          resolve(snapshotToArray(resp));
        } else {
          resolve([]);
        }
      }, err => {
        console.log(err);
      });
    });
  }

  addFeed(newFeed: Feed) {
        let newData = this.ref.push();
        newData.set({
          uuid: this.device.uuid,
          title: newFeed.title,
          url: newFeed.url
        });
  }

  getArticlesForUrl(feedUrl: string) {
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent(feedUrl) + '%22&format=json';
    let articles = [];
    return this.http.get(url)
      .map(data => data.json()['query']['results'])
      .map((res) => {
        if (res == null) {
          return articles;
        }
        let objects = res['item'];
        // var length = 20;

        for (let i = 0; i < objects.length; i++) {
          let item = objects[i];
          // var trimmedDescription = item.description.length > length ?
          //   item.description.substring(0, 80) + "..." :
          //   item.description;
          var trimmedDescription = this.cleanText(item.description);
          // trimmedDescription =  trimmedDescription.substring(0, trimmedDescription.indexOf("...") + 3);
          let newFeedItem = new FeedItem(trimmedDescription, item.link, item.title);
          articles.push(newFeedItem);
        }
        return articles
      })
  }
  private cleanText(text: string) {
    let cleaned = text;
    // cleaned = cleaned.replace(/(<([^>]+)>)/ig,"");
    // cleaned = cleaned.replace(/&#8217;/gi, "\'");
    // cleaned = cleaned.replace(/&#039;/gi, "\'");
    // cleaned = cleaned.replace(/\[&#8230;\]/gi, "...");
    return cleaned;
}
}

