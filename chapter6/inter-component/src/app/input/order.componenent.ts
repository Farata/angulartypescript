import {  Component, Input }  from '@angular/core';

@Component({
  selector: 'order-processor',
  template: `
    Buying {{quantity}} shares of {{stockSymbol}}
  `,
  styles:[`:host {background: cyan;}`]
})
export class OrderProcessorComponent {

  @Input() quantity: number;

  @Input() stockSymbol: string;
}
