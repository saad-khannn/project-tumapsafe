import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../data.service';
import { Alerts, AlertModel } from '../models/alert.model';
import { MyMarkers } from '../models/marker.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userLat: number;
  userLong: number;
  Alerts: Alerts[];

  constructor(private dataService: DataService, private db: AngularFireDatabase, private utils: UtilsService) {
  }

  ngOnInit() {
    this.db.list('/Alerts').valueChanges().subscribe(data => {
      this.Alerts = data as Alerts[];
      this.utils.sortDates(this.Alerts);
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
}
