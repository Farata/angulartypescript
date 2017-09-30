import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  template: `<h3>Watch the breakpoint activation messages in the console.</h3>
  <span *ngIf="showExtras">Showing extra info on large screens</span>
    
  `
})
export class AppComponent {
  showExtras = false;

  constructor(private media: ObservableMedia) {
    this.media.asObservable().subscribe(mediaChange => {
      console.log(mediaChange.mqAlias);

      this.showExtras = mediaChange.mqAlias==='lg'? true:false;

    });
  }
}
