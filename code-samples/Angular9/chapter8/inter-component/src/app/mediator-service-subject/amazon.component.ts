// This is a long version of a component that illustrates the use
// of subscribe, unsubscribe, and ngOnDestroy
// For a shorter version that uses async pipe see eBayComponent
// With Async pipe you don't need to unsubscribe (see eBay component)

import {Component, OnDestroy} from '@angular/core';
import {StateService} from './state.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'amazon',
  template: `<div class="amz">
                <h2 >Amazon component</h2>
               Search criteria: {{searchFor}}
               </div>`,
  styles: ['.amz {background: pink}']
})
export class AmazonComponent implements OnDestroy{

  searchFor: string;
  subscription: Subscription;

  constructor(private state: StateService){

    this.subscription = state.getState()
      .subscribe(event => this.searchFor = event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  // a must
  }
}
