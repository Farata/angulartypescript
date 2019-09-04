import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  template: `
    <h2>Observable events </h2>
    <input type="text" #stockSymbol placeholder="Enter stock" >
  `
})
export class AppComponent implements AfterViewInit {

  @ViewChild('stockSymbol')
  myInputField: ElementRef;

  ngAfterViewInit() {

    let keyup$ = fromEvent(this.myInputField.nativeElement, 'keyup');

    let keyupValue$ = keyup$
      .pipe(
         debounceTime(500),
         map(event => event['target'].value))
      .subscribe(stock => this.getStockQuoteFromServer(stock));
  }

  getStockQuoteFromServer(stock: string) {

    console.log(`The price of ${stock} is ${(100 * Math.random()).toFixed(4)}`);
  }
}















/*
import {Component, ViewChild, ElementRef} from '@angular/core';

import 'rxjs/add/operator/sample';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-root",
  template: `
       <h2>Sharing the same stream from keyup event</h2>
      <input #myinput type="text" placeholder="Start typing" >

      <br> Subscribing to each value: {{data1}}
      <p>
      <br> Subscribing to 3-second samples: {{data2}}
    `
})
export class AppComponent {
  @ViewChild('myinput')
  myInputField: ElementRef;  // Using ElementRef is discouraged

  data1: string;
  data2: string;

  ngAfterViewInit(){

    let keyup$: Observable<any> = Observable.fromEvent(this.myInputField.nativeElement, 'keyup');

    let keyupValue$ = keyup$
      .do(vevent => console.log(event))
      .map(event => event.target.value)
      .share();

    // Subscribe to each keyup
    keyupValue$
      .subscribe(value => this.data1 = value);

    // Subscribe to 3-second samples
    keyupValue$
      .sample(Observable.interval(3000))
      .subscribe(value => this.data2 = value);
  }

}

// @HostListener offers an alternatve way to listen to native events without subscribe()
*/
