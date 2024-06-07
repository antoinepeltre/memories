import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MapboxService {

  accessToken = 'pk.eyJ1IjoiYW50b2luZXBlbHRyZSIsImEiOiJja3N1ZGI1NXMxZmNxMnZtZGlhNmNnaGxrIn0.jEBJTAI58Wbd1qJCLsgo1g';
  baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';


  constructor(
    private http: HttpClient) { }


  getSuggestionsLocalisation(value: string) {
    const uri = `${this.baseUrl}?q=${value}`;
    let params = new HttpParams().set('access_token', this.accessToken);
    return this.http.get(uri, { params });
  }


}