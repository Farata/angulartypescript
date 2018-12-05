import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './reducers';
import {getError, getSearchQuery, getSearchResults} from './selectors';

@Component({
  selector: 'app-ebay',
  template: `
    <div class="ebay">
      <h2>eBay component</h2>
      Search criteria: {{searchFor$ | async}}

      <ul>
        <li *ngFor="let product of searchResults$ | async ">{{product}}</li>
      </ul>
    </div>
    {{error$ | async}}`,
  styles: ['.ebay {background: cyan}']
})
export class EbayComponent {
  searchFor$ = this.store.select(getSearchQuery);
  searchResults$ = this.store.select(getSearchResults);
  error$ = this.store.select(getError);

  constructor(private store: Store<State>) {}
}
