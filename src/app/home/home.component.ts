import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AlertLocation, ResultsEntity, Geometry } from '../location.model';
import { Alerts } from '../alert.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Alerts: Alerts[];
  alertLat: number;
  alertLon: number;
  lat: number;
  long: number;
  constructor(private dataService: DataService, db: AngularFireDatabase) {
    db.list('/Alerts').valueChanges().subscribe(data => {
      this.Alerts = data;
      console.log(this.Alerts);
      const keys = Object.keys(this.Alerts);
      //console.log(keys);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var date = this.Alerts[k].Date;
        console.log(date);
      }
    });
   }

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      });
    }
  }

  private setAlertLocation(){
    
  }
}
