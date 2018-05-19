import {Component} from "@angular/core";

import {ObservableService} from "./observable.service";

@Component({
  selector: 'app-root',
  providers: [ ObservableService ],
  template: `<h1>Custom observable service</h1>
       Current time: {{currentTime | date: 'mediumTime'}}
  `})
export class AppComponent {

  currentTime: Date;

  constructor(private observableService: ObservableService) {

    this.observableService.createObservableService()
      .subscribe( data => this.currentTime = data );
  }
}
