import {  Component, Input }  from '@angular/core';

@Component({
  selector: 'order-processor',
  template: `
    <span *ngIf="!!stockSymbol">Buying {{quantity}} shares of {{stockSymbol}}</span>
  `,
  styles:[`:host {background: cyan;}`]
})
export class OrderProcessorComponent {

  @Input() quantity: number;

  @Input() stockSymbol: string;
}
