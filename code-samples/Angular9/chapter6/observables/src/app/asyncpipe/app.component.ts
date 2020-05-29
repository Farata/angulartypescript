import { Component } from '@angular/core';
import {take} from 'rxjs/operators';
import {interval} from "rxjs";

@Component({
  selector: "app-root",
  template: `{{numbers$ | async}}`
})
export class AppComponent {

  numbers$ = interval(1000)
               .pipe(take(10));
}
