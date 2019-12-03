import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertLocation } from './models/location.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headerDict = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  requestOptions = {
    headers: new HttpHeaders()
  };
  firstHalf = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  secondHalf = ',+Philadelphia,+PA&key=AIzaSyCh8_uCyeKA2fzIVlNmJYdjqy6C8Zi7A9M';

  constructor(private http: HttpClient) { }

  getAlertLocation(location: string){
    return this.http.get<AlertLocation>(this.firstHalf + location + this.secondHalf, this.requestOptions);
  }
}
