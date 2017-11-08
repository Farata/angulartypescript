import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-root",
  template: `
    <h2>Observable weather</h2>
    <input type="text" placeholder="Enter city" [formControl]="searchInput">
    <h3>{{weather}}</h3>
  `
})
export class AppComponent implements OnInit{
  private baseWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = "&units=imperial&appid=ca3f6d6ca3973a518834983d0b318f73";

  searchInput: FormControl = new FormControl();
  weather: string;

  constructor(private http:HttpClient){ }

  ngOnInit(){
    this.searchInput.valueChanges
      .debounceTime(200)
      .switchMap(city => this.getWeather(city))
      .subscribe(
        res => {
          this.weather =
            `Current temperature is  ${res['main'].temp}F, ` +
            `humidity: ${res['main'].humidity}%`;
        },
        err => console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url)
      );
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
      .catch( err => {
        if (err.status ===404){
          console.log(`City ${city} not found`) ;
          return Observable.empty()}    // empty observable
      });
  }
}
