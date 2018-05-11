import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: "app-root",
  template: `
       <h2>Observable events from formcontrol</h2>
      <input type="text" placeholder="Enter stock" [formControl]="searchInput">
    `
})
export class AppComponent {

  searchInput = new FormControl('');

  constructor(){

    this.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(stock => this.getStockQuoteFromServer(stock));
  }

  getStockQuoteFromServer(stock: string) {

    console.log(`The price of ${stock} is ${(100*Math.random()).toFixed(4)}`);
  }
}
