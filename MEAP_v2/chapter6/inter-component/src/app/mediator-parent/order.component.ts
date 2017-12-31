import {Component, Input} from '@angular/core';
import {IStock} from './istock';

@Component({
  selector: 'order-processor',
  template: `{{message}}`,
  styles:[`:host {background: cyan;}`]
})
export class OrderComponent {

  message = "Waiting for orders...";

  @Input() set stock(value: IStock ){
    if (value && value.bidPrice != undefined) {
      this.message = `Placed order to buy 100 shares
                          of ${value.stockSymbol} 
                          at \$${value.bidPrice.toFixed(2)}`;
    }
  }
}

