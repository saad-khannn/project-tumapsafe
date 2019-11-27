import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Alerts, AlertsEntity } from './alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Alerts: Alerts[];

  constructor(db: AngularFireDatabase) {
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
}
