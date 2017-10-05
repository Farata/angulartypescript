import { Component } from '@angular/core';
import {IStock} from './istock';

@Component({
  selector: 'app-root',
  template: `
    <price-quoter (buy)="priceQuoteHandler($event)"></price-quoter>
    
    <order-processor [stock]="stock"></order-processor>
  `
})
export class AppComponent {
  stock: IStock;

  priceQuoteHandler(event:IStock) {
    this.stock = event;
  }
}
