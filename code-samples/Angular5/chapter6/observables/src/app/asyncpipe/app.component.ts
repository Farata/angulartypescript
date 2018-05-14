import { Component } from '@angular/core';
import {take} from 'rxjs/operators';
import {Observable} from "rxjs";

@Component({
  selector: "app-root",
  template: `{{numbers$ | async}}`
})
export class AppComponent {

  numbers$: Observable<number> =
             Observable.interval(1000)
               .pipe(take(10));
}
