import { Component } from '@angular/core';
import { ShoppingCartService } from './shared/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private shoppingCartService: ShoppingCartService) {}

  get cartTotalQuantity(): number {
    // null removes attribute from the element, so the badge is not displayed.
    return this.shoppingCartService.totalQuantity || null;
  }
}
