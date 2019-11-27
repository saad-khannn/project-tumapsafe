import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Alerts: any[]

  constructor(db: AngularFireDatabase) { 
    db.list('/Alerts').valueChanges().subscribe(Alerts =>{
      this.Alerts = Alerts;
      console.log(this.Alerts);
    })
  }
}
