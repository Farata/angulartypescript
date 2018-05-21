import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {INCREMENT} from "../reducer";

@Component({
  selector: 'app-child',
  template: `      
    <h3> Child component </h3>  
    <p>
      The counter in child is {{childCounter$ | async}}
    </p>
  `,
  styles: []
})
export class ChildComponent {

    childCounter$: Observable<number>;

    constructor(private store: Store<any>) {
        this.childCounter$ = store.pipe(select('counterState'));

        setTimeout(() => this.store.dispatch({type: INCREMENT}),
            10000);
    }
}
