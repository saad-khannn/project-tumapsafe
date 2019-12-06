import { Injectable } from '@angular/core';
import { Alerts } from './models/alert.model';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  public getMonthValue(inMonth: string) {
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < months.length; i++) {
      if (months[i] === inMonth) {
        return i;
      }
    }
    return -1;
  }

  public compareDays(day1: number, day2: number) {
    if (day1 < day2) {
      return true;
    } else {
      return false;
    }
  }

  public formatDays(day1: string, day2: string) {
    let new1 = '';
    let new2 = '';
    console.log('day 1: ' + day1);
    console.log('day 2: ' + day2);
    for (let char of day1) {
      if (!(char === ',')) {
        new1 += char;
      }
    }
    for (let char of day2) {
      if (!(char === ',')) {
        new2 += char;
      }
    }
    return this.compareDays(Number(new1), Number(new2));
  }

  public sortDates(alerts: Alerts[]) {
    let tempAlert: Alerts;
    const keys = Object.keys(alerts);
    for (let i = 0; i < alerts.length - 1; i++) {
      for (let j = 0; j < alerts.length - i - 1; j++) {
        const trail = keys[j];
        const lead = keys[j + 1];
        if (this.getMonthValue((alerts[trail].Date as string).substring(6, 9)) <
          this.getMonthValue((alerts[lead].Date as string).substring(6, 9))) {
          tempAlert = alerts[lead];
          alerts[lead] = alerts[trail];
          alerts[trail] = tempAlert;
        } else if (this.getMonthValue((alerts[trail].Date as string).substring(6, 9)) ===
          this.getMonthValue((alerts[lead].Date as string).substring(6, 9))) {
          if (this.formatDays(((alerts[trail].Date as string).substring(10, 12)), (alerts[lead].Date as string).substring(10, 12))) {
            tempAlert = alerts[lead];
            alerts[lead] = alerts[trail];
            alerts[trail] = tempAlert;
          }
        }
      }
    }
  }

}
