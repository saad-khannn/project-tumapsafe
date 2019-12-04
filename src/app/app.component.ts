import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Alerts, AlertsEntity } from './models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  Alerts: Alerts[];

  constructor(db: AngularFireDatabase) {
  }
}

