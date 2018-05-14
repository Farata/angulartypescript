import { Component } from '@angular/core';
import {Stock} from './istock';

@Component({
  selector: 'app-root',
  template: `
    <price-quoter (buy)="priceQuoteHandler($event)"></price-quoter>
    
    <order-processor [stock]="receivedStock"></order-processor>
  `
})
export class AppComponent {
  receivedStock: Stock;

  priceQuoteHandler(event:Stock) {
    this.receivedStock = event;
  }
}
