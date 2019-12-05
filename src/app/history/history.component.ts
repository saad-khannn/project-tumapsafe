import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../data.service';
import { Alerts, AlertModel } from '../models/alert.model';
import { MyMarkers } from '../models/marker.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userLat: number;
  userLong: number;
  Alerts: Alerts[];
  Locations: string[];
  Lats: number[];
  Longs: number[];
  AlertLocation: number;
  Markers: MyMarkers[];

  constructor(private dataService: DataService, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.db.list('/Alerts').valueChanges().subscribe(data => {
      this.Lats = [];
      this.Longs = [];
      this.Alerts = data as Alerts[];
    });
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLat = position.coords.latitude;
        this.userLong = position.coords.longitude;
      });
    }
  }

  returnLat(location: string, index: number) {
    if (location === 'N/A'){
      this.Lats[index] = -1;
    } else {
      this.dataService.getAlertLocation(location).subscribe ( res => {
        this.Lats[index] = res.results[0].geometry.location.lat;
      });
    }
  }

  returnLong(location: string ,index: number) {
    if (location === 'N/A'){
      this.Longs[index] = -1;
    } else {
      this.dataService.getAlertLocation(location).subscribe ( res => {
        this.Longs[index] = res.results[0].geometry.location.lng;
      });
    }
  }

}
