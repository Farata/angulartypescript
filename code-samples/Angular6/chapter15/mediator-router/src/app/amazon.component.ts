import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './reducers';
import {getError, getSearchQuery, getSearchResults} from './selectors';

@Component({
  selector: 'app-amazon',
  template: `
    <div class="amz">
      <h2>Amazon component</h2>
      Search criteria: {{searchFor$ | async}}

      <ul>
        <li *ngFor="let p of searchResults$ | async">{{p}}</li>
      </ul>
    </div>
    {{error$ | async}}`,
  styles: ['.amz {background: pink}']
})
export class AmazonComponent {
  searchFor$ = this.store.select(getSearchQuery);
  searchResults$ = this.store.select(getSearchResults);
  error$ = this.store.select(getError);

  constructor(private store: Store<State>) {}
}
