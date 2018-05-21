import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {INCREMENT, DECREMENT} from "./reducer";

@Component({
  selector: 'app-root',
  template: `    
     <button (click)="increment()">Increment</button>
     <button (click)="decrement()">Decrement</button>
     <p>The counter: {{counter$ | async}}</p>
     <app-child></app-child>
  `
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store: Store<any>) {
    this.counter$ = store.select('counterState');
  }

  increment(){
    this.store.dispatch({type: INCREMENT});
  }

  decrement(){
    this.store.dispatch({type: DECREMENT});
  }
}
