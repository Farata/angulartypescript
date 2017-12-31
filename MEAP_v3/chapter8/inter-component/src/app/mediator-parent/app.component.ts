import { Component } from '@angular/core';
import {IStock} from './istock';

@Component({
  selector: 'app-root',
  template: `
    <price-quoter (buy)="priceQuoteHandler($event)"></price-quoter>
    
    <order-processor [stock]="receivedStock"></order-processor>
  `
})
export class AppComponent {
  receivedStock: IStock;

  priceQuoteHandler(event:IStock) {
    this.receivedStock = event;
  }
}
