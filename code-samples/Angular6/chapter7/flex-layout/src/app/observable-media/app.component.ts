import {Component} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<h3>Watch the breakpoint activation messages in the console.</h3>
  <span *ngIf="showExtras$ | async">Showing extra info on medium screens</span>
  <span *ngIf="this.media.isActive('md')">Showing extra info on medium screens with isActive</span>

  `
})
export class AppComponent {
  showExtras$: Observable<boolean>;

  constructor(public media: ObservableMedia) {
    this.showExtras$ = this.media.asObservable()
      .pipe(map(mediaChange => {
           console.log(mediaChange);
           return mediaChange.mqAlias==='md'? true:false;
          })
      );
  }
}

/*
// A simplified version that uses isActive() API
import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  template: `<h3>Using the ObservableMedia.isActive() API</h3>
  <span *ngIf="this.media.isActive('md')">Showing extra info on medium screens</span>
  `
})
export class AppComponent {
  constructor(public media: ObservableMedia) {}
}*/
