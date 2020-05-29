import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" placeholder="Enter stock (e.g. AAPL)"  (change)="onChangeEvent($event)">

    <order-processor [stockSymbol]="stock" [quantity]="numberOfShares"></order-processor>
  `
})
export class AppComponent {
  stock: string;
  readonly numberOfShares = 100;

  onChangeEvent({target}): void {
    this.stock = target.value;
  }
}
