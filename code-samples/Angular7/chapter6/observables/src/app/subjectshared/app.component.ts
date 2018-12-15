import {Component} from '@angular/core';
import {Subject, interval} from "rxjs";
import {filter, map, sample} from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <h3>Sharing Observable from a Subject between subscribers</h3>
    <input type="text" placeholder="Start typing"
           (input)="mySubject$.next($event)"
           (keyup)="mySubject$.next($event)">

    <br> Subscriber to input events got {{inputValue}}
    <p>
      <br> Subscriber to key events got {{keyValue}}
  `
})
export class AppComponent {

  keyValue: string;
  inputValue: string;

  mySubject$: Subject<Event> = new Subject();

  constructor(){

    // Subscriber 1
    this.mySubject$
      .pipe(
         filter(({type}) => type==="keyup"),
         map(e => (<KeyboardEvent>e).key)
      )
      .subscribe((value) => this.keyValue=value);

    // Subscriber 2
    this.mySubject$
      .pipe(
         filter(({type}) => type==="input"),
         map(e => (<HTMLInputElement>e.target).value)
        // , sample(interval(3000))   // uncomment to get 3-sec samples
      )
      .subscribe((value) => this.inputValue=value);
  }
}
