import {  Component, Input }  from '@angular/core';


@Component({
  selector: 'order-processor',
  template: `
    Buying {{quantity}} shares of {{stockSymbol}}
  `,
  styles:[`:host {background: cyan;}`]
})
export class OrderComponent {

  @Input() quantity: number;

  @Input() stockSymbol: string;

/*  private _stockSymbol: string;

  @Input()
  set stockSymbol(value: string) {

    if (value != undefined) {
      this._stockSymbol = value;
      console.log(`Buying ${this.quantity} shares of ${value}`);
    }
  }

  // We use stockSymbol in the template
  get stockSymbol(): string {
    return this._stockSymbol;
  }*/
}
