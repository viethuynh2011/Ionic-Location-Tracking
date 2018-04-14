import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { Device } from '@ionic-native/device';
import { Diagnostic } from '@ionic-native/diagnostic';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation, private diagnostic: Diagnostic) {
    platform.ready().then(() => {
       //============ check location status   (Optional) ============
       this.diagnostic.isLocationEnabled().then(success => {
        // alert("location enable = "+JSON.stringify(success));
      }, error => {
        alert("location enable error = "+JSON.stringify(error));
    })
       //============ check GPS status   (Optional) ============
    this.diagnostic.isGpsLocationAvailable().then(success => {
        // alert("GPS location Available = "+JSON.stringify(success));
      }, error => {
        alert("GPS location error = "+JSON.stringify(error));
    })
       //============ check Location Authorization Status  (Optional) ============
    this.diagnostic.getLocationAuthorizationStatus().then(success => {
        // alert("app location  Authorization= "+JSON.stringify(success));
      }, error => {
        alert("app location Authorization error = "+JSON.stringify(error));
    })
      this.initMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  initMap() {
    var options = { enableHighAccuracy: false, maximumAge: 300000, timeout: 6000 };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      console.log('mylocation', mylocation);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      console.log('mylocation', updatelocation);
      let image = 'assets/imgs/if_car_60995.png';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
    });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      // position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
}
