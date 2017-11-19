import {Component, OnDestroy} from '@angular/core';
import {StateService} from "./state.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'product',
  template: `<div class="ebay">
                <h2 >eBay component</h2>
               Search criteria: {{state.getState() | async}}
               </div>`,
  styles: ['.ebay {background: cyan}']
})
export class EbayComponent {

  constructor(public state: StateService){}
}
