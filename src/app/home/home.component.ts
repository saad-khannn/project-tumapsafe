import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number;
  long: number;
  Alerts: any[];
  alertDescription: any;
  alertLocation: any;
  alertLat: number;
  alertLong: number;

  constructor(db: AngularFireDatabase) {
    db.list('/Alerts').valueChanges().subscribe(Alerts => {
      this.Alerts = Alerts;
      var keys = Object.keys(Alerts);
      for (var i = 0; i < 1; i++) {
        var k = keys[i];
        this.alertDescription = Alerts[k].Description;
        this.alertLocation = Alerts[k].Location.split(" ").join("+");
        var url = "https://maps.googleapis.com/maps/api/geocode/json?&address="+ this.alertLocation + "+Philadelphia,+PA&key=AIzaSyCh8_uCyeKA2fzIVlNmJYdjqy6C8Zi7A9M"
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send(null);
        var data = JSON.parse(req.responseText);
        this.alertLat = data.results[0].geometry.location.lat; 
        this.alertLong = data.results[0].geometry.location.lng;
      }
    })
  }

  ngOnInit() {
    this.getUserLocation()
    }

  getUserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      });
    }
  }

  userIcon = {
    url: 'https://clipground.com/images/schaumburg-clipart-20.jpg',
    scaledSize: {
      width: 75,
      height: 75
      }
  }

  alertIcon = {
    url: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/115-512.png',
    scaledSize: {
      width: 50,
      height: 50
      }
  }
}
