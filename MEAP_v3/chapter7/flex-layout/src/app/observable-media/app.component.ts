import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `<h3>Watch the breakpoint activation messages in the console.</h3>
  <span *ngIf="showExtras | async">Showing extra info on large screens</span>
    
  `
})
export class AppComponent {
  showExtras: Observable<boolean>;

  constructor(private media: ObservableMedia) {
    this.showExtras = this.media.asObservable().map(mediaChange => {
      console.log(mediaChange.mqAlias);

      return mediaChange.mqAlias==='lg'? true:false;

    });
  }
}
