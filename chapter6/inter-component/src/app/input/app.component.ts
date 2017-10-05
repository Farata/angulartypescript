import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" placeholder="Enter stock (e.g. AAPL)"  (change)="onInputEvent($event)">

    <order-processor [stockSymbol]="stock" [quantity]="numberOfShares"></order-processor>
  `
})
export class AppComponent {
  stock:string;
  readonly numberOfShares = 100;

  onInputEvent({target}):void{
    this.stock=target.value;
  }
}
