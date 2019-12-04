import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { AlertLocation, ResultsEntity, Geometry } from '../models/location.model';
import { Alerts } from '../models/alert.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { UtilsService } from '../utils.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})  
userLat: number;
userLong: number;
Alerts: Alerts[];
location: AlertLocation;
alertLat: number;
alertLong: number;
alertDescription: string;
alertDate: string;
alertTime: string;
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService, db: AngularFireDatabase, utils: UtilsService) {
    db.list('/Alerts').valueChanges().subscribe(data => {
      this.Alerts = data;
      //console.log(this.Alerts);
      const keys = Object.keys(this.Alerts);
      const k = keys[0];
      this.formatAlertInfo(this.Alerts[k].Description, this.Alerts[k].Date, this.Alerts[k].Time);
      this.dataService.getAlertLocation(this.Alerts[k].Location).subscribe(locationData => {
        this.location = locationData;
        this.alertLat = this.location.results[0].geometry.location.lat;
        this.alertLong = this.location.results[0].geometry.location.lng;
      });
    });
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
      width: 25,
      height: 25
    }
  }

  ngOnInit() {
    this.getUserLocation();
  }


  getUserLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          this.userLat = position.coords.latitude;
          this.userLong = position.coords.longitude;
      });
    }
  }


  private formatAlertInfo(description: string, date: string, time: string) {
    this.alertDescription = description;
    this.alertDate = date;
    this.alertTime = time;

  
  }
}
