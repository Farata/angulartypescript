import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  template: '<h3>See breakpoint activation messages in the console.</h3>'
})
export class AppComponent {
  constructor(private media: ObservableMedia) {
    this.media.asObservable().subscribe(mediaChange => {
      console.log(mediaChange.mqAlias);
    });
  }
}
