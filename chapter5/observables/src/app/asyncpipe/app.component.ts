import { Component } from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-root",
  template: `{{numbers | async}}`
})
export class AppComponent {

  numbers: Observable<number> =
             Observable.interval(1000)
               .take(10);
}
